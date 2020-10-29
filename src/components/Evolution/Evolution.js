import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import VideoLayout from '../Layout/Video';
import AI from './AI/AI';
import ScrollingText from './ScrollingText/ScrollingText';
import Speak from './Speak/Speak';
import Education from './Education/Education';
import KeyMapping from './KeyMapping/KeyMapping';
import Tips from './Tips/Tips';
import VideoPlayer from './VideoPlayer/VideoPlayer';
import AdminPanel from './AdminPanel/AdminPanel';
import Evaluation from './Evaluation/Evaluation';
import { playlistFromId } from 'utils/video';
import { startTime } from 'store/actions/ai';

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
        </>
      )}
    </>
  );
}

export default Evolution;