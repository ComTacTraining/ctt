import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import VideoLayout from '../containers/Layout/Video';
import AI from './AI/AI';
import ScrollingText from './ScrollingText';
import Speak from './Speak';
import Education from './Education';
import KeyMapping from './KeyMapping';
// import SpeechToText from './Transcribe/SpeechToText';
// import Transcribe from './Transcribe/Transcribe';
import Tips from './Tips';
import VideoPlayer from './VideoPlayer';
import { playlistFromId } from 'utils/video';
import Command from './Command';
import AdminPanel from './AdminPanel/AdminPanel';
import { startTime } from '../store/actions/ai';

const Evolution = () => {
  const dispatch = useDispatch();
  // const history = useHistory();
  const { firstAlarmAnnounced, faceToFaceCompleted } = useSelector(state => state.ai);
  const { id } = useSelector(state => state.evolution);
  const { showTips } = useSelector(state => state.user);
  const [playlist, setPlaylist] = useState(false);

  useEffect(() => {
    if (id) {
      setPlaylist(playlistFromId(id));
      dispatch(startTime());
    }
  }, [id, dispatch]);

  // const handlePlaylistEnded = () => {
  //   // evaluation
  //   // peer review
  //   history.push('/profile');
  // }

  

  return (
    <>
      {playlist && (
        <>
          <AI />
          <Speak />
          <KeyMapping />
          <VideoLayout>
            <ScrollingText />
            {firstAlarmAnnounced && showTips && <Tips />}
            <VideoPlayer playlist={playlist} 
            // onPlaylistEnded={handlePlaylistEnded} 
            />
          </VideoLayout>
          <AdminPanel />
          {/* {firstAlarmAnnounced && <SpeechToText />} */}
          {faceToFaceCompleted && <Education />}
          <Command />
        </>
      )}
    </>
  );
}

export default Evolution;