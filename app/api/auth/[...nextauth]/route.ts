/* eslint-disable @typescript-eslint/no-unused-vars */
// import { prisma } from "@/lib/prisma";
import { session } from "@/lib/session";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { XataAdapter } from "@auth/xata-adapter";
import axios from "axios";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

// const client = new XataClient()

const authOption: NextAuthOptions = {
  // adapter: XataAdapter(client),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (!profile?.email) {
        throw new Error("No profile");
      }

      console.log("PROFILE", profile);
      console.log("Account:::", account);
      
      // await prisma.user.upsert({
      //   where: {
      //     email: profile.email,
      //   },
      //   create: {
      //     email: profile.email,
      //     name: profile.name,
      //   },
      //   update: {
      //     name: profile.name,
      //   },
      // })
      return true;
    },
    session,
    async jwt({ token, user, account, profile }) {
      const {data} = await axios.post('http://localhost:5050/api/v1/auth/google/sign-in', {idToken : account?.id_token}, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log(data);

      // Only need this if you want to pass through additional data
    //   if (profile) {
    //     const user = await prisma.user.findUnique({
    //       where: {
    //         email: profile.email,
    //       },
    //     });
    //     if (!user) {
    //       throw new Error("No user found");
    //     }
    //     token.id = user.id;
    //   }
      return token;
    },
  },
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
