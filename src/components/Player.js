import React, { useEffect } from 'react';
import { usePlayerContext } from '../context/PlayerContext';
import { Button, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const Player = () => {
  const { currentTrack, setCurrentTrack } = usePlayerContext();
  const [isPlaying, setIsPlaying] = React.useState(false);

  useEffect(() => {
    if (currentTrack) {
      // Handle autoplay logic when a new track is selected
      setIsPlaying(true);
    }
  }, [currentTrack]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="player">
      {currentTrack ? (
        <>
          <div className="track-info">
            <img src={currentTrack.album.images[0].url} alt={currentTrack.name} />
            <h3>{currentTrack.name}</h3>
            <h4>{currentTrack.artists[0].name}</h4>
          </div>
          <IconButton onClick={togglePlayPause}>
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
        </>
      ) : (
        <p>Select a track to play</p>
      )}
    </div>
  );
};

export default Player;
