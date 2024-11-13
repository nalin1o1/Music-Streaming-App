// src/components/PlaylistView.js
import React from 'react';
import './PlaylistView.css';

const PlaylistView = ({ searchResults }) => {
  return (
    <div className="playlist-container">
      <h2>Search Results</h2>
      <ul className="track-list">
        {searchResults.map((track) => (
          <li key={track.id} className="track-item">
            <img src={track.album.images[0]?.url} alt={track.name} />
            <div className="track-details">
              <span className="track-name">{track.name}</span>
              <span className="track-description">
                {track.artists.map((artist) => artist.name).join(", ")}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistView;
