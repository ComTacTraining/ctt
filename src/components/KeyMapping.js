import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Sound from 'react-sound';
import chirpSoundSource from '../audio/mdc1200.mp3';
import * as aiActions from '../store/actions/ai';
import useKeyPress from '../hooks/useKeyPress';


const KeyMapping = (props) => {
  const ai = useSelector((state) => state.ai);
  const dispatch = useDispatch();
  const isTalking = useKeyPress('Space', true);
  const isTransferOfCommand = useKeyPress('KeyF');
  const [radioSoundPlaying, setRadioSoundPlaying] = useState(false);
  const [isHavingFaceToFace, setIsHavingFaceToFace] = useState(false);

  const { 
    incomingCommandOfficerArrived, 
    faceToFaceRequested, 
    faceToFaceCompleted 
  } = ai;

  useEffect(() => {
    if (isTalking) {
      setRadioSoundPlaying(true);
      dispatch(aiActions.startRecordingMicrophone());
    } else {
      // setRadioSoundPlaying(false);
      setRadioSoundPlaying(true);
      dispatch(aiActions.stopRecordingMicrophone());
    }
  }, [isTalking, dispatch]);

  useEffect(() => {
    const checkTransferStatus = () => {
      if (isHavingFaceToFace) {
        dispatch(aiActions.faceToFaceCompleted());
        setIsHavingFaceToFace(false);
      } else if (incomingCommandOfficerArrived && !isHavingFaceToFace) {
        dispatch(aiActions.faceToFaceRequested());
        setIsHavingFaceToFace(true);
      }
    }
    
    if (isTransferOfCommand) {
      checkTransferStatus();
    }
  }, [isTransferOfCommand, isHavingFaceToFace, incomingCommandOfficerArrived, faceToFaceRequested, faceToFaceCompleted, dispatch]);

  return (
    <div data-testid='keymapping'>
      {radioSoundPlaying === true && (
        <div data-testid='radiosound'>
          <Sound
            url={chirpSoundSource}
            playStatus='PLAYING'
            onFinishedPlaying={() => setRadioSoundPlaying(false)}
          />
        </div>
      )}
    </div>
  );
};

export default KeyMapping;
