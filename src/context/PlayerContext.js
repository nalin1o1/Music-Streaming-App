import React, { createContext, useState, useContext } from 'react';

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const addToPlaylist = (track, playlistId) => {
    setPlaylists(prevPlaylists => {
      const updatedPlaylists = prevPlaylists.map(playlist => {
        if (playlist.id === playlistId) {
          playlist.songs.push(track);
        }
        return playlist;
      });
      return updatedPlaylists;
    });
  };

  const searchSongs = async (query) => {
    // Simulate an API call (replace with real Spotify API call)
    const results = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`);
    const data = await results.json();
    setSearchResults(data.tracks.items);
  };

  return (
    <PlayerContext.Provider value={{
      currentTrack,
      setCurrentTrack,
      playlists,
      setPlaylists,
      searchResults,
      searchSongs,
      addToPlaylist
    }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => useContext(PlayerContext);
