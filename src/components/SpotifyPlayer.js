import React, { useState, useEffect } from 'react';

const SpotifyPlayer = ({ token }) => {
  const [player, setPlayer] = useState(null);
  const [deviceId, setDeviceId] = useState(null);

  useEffect(() => {
    // Load the Web Playback SDK script dynamically if it’s not already loaded
    if (!window.Spotify) {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => initializePlayer();
    } else {
      initializePlayer();
    }

    return () => {
      if (player) player.disconnect();  // Cleanup player on unmount
    };
  }, [token]);

  const initializePlayer = () => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const newPlayer = new Spotify.Player({
        name: "My Web Player",
        getOAuthToken: cb => { cb(token); },
        volume: 0.5
      });

      // Error handling
      newPlayer.addListener('initialization_error', ({ message }) => console.error(message));
      newPlayer.addListener('authentication_error', ({ message }) => console.error(message));
      newPlayer.addListener('account_error', ({ message }) => console.error(message));
      newPlayer.addListener('playback_error', ({ message }) => console.error(message));

      // Player state updates
      newPlayer.addListener('player_state_changed', state => console.log(state));

      // When player is ready, save the device ID
      newPlayer.addListener('ready', ({ device_id }) => {
        console.log('Player is ready with Device ID', device_id);
        setDeviceId(device_id);
      });

      // Connect to the player
      newPlayer.connect();
      setPlayer(newPlayer);
    };
  };

  const transferPlayback = async () => {
    // Transfer playback to this web player
    await fetch("https://api.spotify.com/v1/me/player", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ device_ids: [deviceId], play: true })
    });
  };

  const playTrack = async (trackUri) => {
    // Play a specific track
    await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ uris: [trackUri] })
    });
  };

  return (
    <div>
      <button onClick={transferPlayback}>Transfer Playback</button>
      <button onClick={() => playTrack("spotify:track:YOUR_TRACK_ID")}>Play Track</button>
    </div>
  );
};

export default SpotifyPlayer;
