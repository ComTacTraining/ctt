import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import Sound from "react-sound";
// import chirpSoundSource from "assets/audio/mdc1200.mp3";
import * as aiActions from "store/actions/ai";
import * as userActions from "store/actions/user";
import useKeyPress from "hooks/useKeyPress";

const KeyMapping = props => {
  const ai = useSelector(state => state.ai);
  const dispatch = useDispatch();
  // const isTalking = useKeyPress('Space', true);
  const isTalking = useKeyPress("Backquote");
  // const isTransferOfCommand = useKeyPress("KeyF");
  const isTips = useKeyPress("Backslash");
  const [loaded, setLoaded] = useState(false);
  const [radioSoundPlaying, setRadioSoundPlaying] = useState(false);

  const { isPartialCommand } = ai;

  useEffect(() => {
    if (!isPartialCommand && isTalking) {
      setRadioSoundPlaying(true);
      setLoaded(true);
      dispatch(aiActions.startRecordingMicrophone());
    } else {
      if (loaded) {
        setRadioSoundPlaying(true);
        dispatch(aiActions.stopRecordingMicrophone());
      }
    }
  }, [isPartialCommand, isTalking, dispatch, loaded]);

  useEffect(() => {
    if (isTips) {
      dispatch(userActions.toggleTips());
    }
  }, [isTips, dispatch]);

  return (
    <div data-testid="keymapping">
      {radioSoundPlaying === true && (
        <div data-testid="radiosound">
          {/* <Sound
            url={chirpSoundSource}
            volume={5}
            playStatus="PLAYING"
            onFinishedPlaying={() => setRadioSoundPlaying(false)}
          /> */}
        </div>
      )}
    </div>
  );
};

export default KeyMapping;
