import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const SpotifyLoginCallback = () => {
  const history = useHistory();

  useEffect(() => {
    const hash = window.location.hash;
    const token = new URLSearchParams(hash.substring(1)).get('access_token');
    if (token) {
      window.localStorage.setItem('access_token', token);  // Store the token in localStorage
      history.push('/');  // Redirect to home after token extraction
    }
  }, [history]);

  return <div>Loading...</div>;
};

export default SpotifyLoginCallback;
