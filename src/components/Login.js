// components/Login.js
import React from 'react';

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';
const SCOPES = 'playlist-read-private playlist-modify-public streaming';

const Login = () => {
  const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}&response_type=${RESPONSE_TYPE}`;

  return (
    <div>
      <h2>Login to Spotify</h2>
      <a href={loginUrl}>
        <button>Login with Spotify</button>
      </a>
    </div>
  );
};

export default Login;
