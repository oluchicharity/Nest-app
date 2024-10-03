// app/oauth.tsx
import React from 'react';

const OAuthPage = () => {
  const handleLogin = async () => {
    window.open('YOUR_OAUTH_URL', '_self');
  };

  return (
    <div>
      <h1>OAuth Login</h1>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
};

export default OAuthPage;
