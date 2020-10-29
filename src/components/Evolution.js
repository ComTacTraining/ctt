import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import VideoLayout from '../containers/Layout/Video';
import AI from './AI/AI';
import ScrollingText from './ScrollingText';
import Speak from './Speak';
import Education from './Education';
import KeyMapping from './KeyMapping';
import Tips from './Tips';
import VideoPlayer from './VideoPlayer';
import { playlistFromId } from 'utils/video';
import Command from './Command';
import AdminPanel from './AdminPanel/AdminPanel';
import { startTime } from '../store/actions/ai';
import Evaluation from './Evaluation';

const Evolution = () => {
  const dispatch = useDispatch();
  const { firstAlarmAnnounced, faceToFaceCompleted, educationCompleted } = useSelector(state => state.ai);
  const { id } = useSelector(state => state.evolution);
  const { showTips } = useSelector(state => state.user);
  const [playlist, setPlaylist] = useState(false);

  useEffect(() => {
    if (id) {
      setPlaylist(playlistFromId(id));
      dispatch(startTime());
    }
  }, [id, dispatch]);

  return (
    <>
    
      {playlist && (
        <>
          <AI />
          <Speak />
          <KeyMapping />
          {!educationCompleted && (
            <VideoLayout>
              <ScrollingText />
              {firstAlarmAnnounced && showTips && <Tips />}
              <VideoPlayer playlist={playlist} />
            </VideoLayout>
          )}
          {faceToFaceCompleted && <Education />}
          {educationCompleted && <Evaluation />}
          <AdminPanel />
          <Command />
        </>
      )}
    </>
  );
}

export default Evolution;