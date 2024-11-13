// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import PlaylistView from './components/PlaylistView';
import SearchBar from './components/SearchBar';

const App = () => {
  const [token, setToken] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
  const hash = window.location.hash;
  const tokenMatch = hash.match(/access_token=([^&]*)/);

  if (tokenMatch) {
    const token = tokenMatch[1];
    setToken(token); // Save the token to state
    console.log("Token retrieved:", token); // Log the token
    window.location.hash = ''; // Clear the hash in the URL
  } else {
    console.log("No token found in URL");
  }
}, []);


  const handleSearch = async (query) => {
    if (!token || !query) {
      console.log("Token or query missing");  // Debug missing token or query
      return;
    }

    try {
      console.log("Searching Spotify for:", query);  // Debug query being sent
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log("Spotify search results:", data);  // Debug the API response
      setSearchResults(data.tracks.items || []);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="App">
      <div className="navbar">
        <SearchBar onSearch={handleSearch} />
      </div>
      
      <PlaylistView searchResults={searchResults} />
    </div>
  );
};

export default App;
