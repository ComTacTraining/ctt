import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AI from './AI';
import Speak from './Speak';
import ScrollingText from './ScrollingText';
import VideoPlayer from './VideoPlayer';
import { playlistFromId } from 'utils/video';

const Evolution = () => {
  const history = useHistory();
  // const { scrollText } = useSelector(state => state.ai);
  const evolution = useSelector(state => state.evolution);
  const { id } = evolution;
  const [playlist, setPlaylist] = useState(false);

  useEffect(() => {
    if (id) {
      setPlaylist(playlistFromId(id));
    }
  }, [id]);

  const handlePlaylistEnded = () => {
    // evaluation
    // peer review
    history.push('/profile');
  }

  return (
    <>
      {playlist && (
        <>
          <AI />
          <ScrollingText />
          <Speak />
          <VideoPlayer playlist={playlist} onPlaylistEnded={handlePlaylistEnded} />
        </>
      )}
    </>
  );
}

export default Evolution;