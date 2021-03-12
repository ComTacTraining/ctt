import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TextToSpeech from 'components/Evolution/Speak/TextToSpeech'
import {
  removeOldestSpeechFromQueue,
  addToLog,
  threeSixtyWalkthroughBegan,
  faceToFaceRequested,
  faceToFaceCompleted
} from 'store/actions/ai'

const Speak = () => {
  const dispatch = useDispatch();
  const ai = useSelector(state => state.ai);
  const { waitingToBeSpoken, isRecordingMicrophone } = ai;

  const [speech, setSpeech] = useState({ text: '', voice: '', meta: null });

  useEffect(() => {
    console.log("waitingToBeSpoken ", waitingToBeSpoken);
    if (waitingToBeSpoken.length > 0 && !isRecordingMicrophone) {
      const label = waitingToBeSpoken[0].label;
      const text = waitingToBeSpoken[0].text;
      const voice = waitingToBeSpoken[0].voice;
      const meta = waitingToBeSpoken[0].meta || null;
      const timestamp = Date.now();

      setSpeech({ text, voice, meta });
      dispatch(addToLog({ timestamp, label, text }));
      console.log("speaking");
    }
  }, [waitingToBeSpoken, dispatch]);

  const metaTriggersAfterSpeech = meta => {
    switch (meta) {
      case "INITIAL_REPORT_RESPONSE":
        dispatch(threeSixtyWalkthroughBegan());
        return;
      case "INCOMING_COMMAND_ARRIVED":
        dispatch(faceToFaceRequested());
        return;
      case "INCOMING_COMMAND_RESPONSE":
        dispatch(faceToFaceCompleted());
        return;
      default:
        return;
    }
  };

  const handleTextToSpeechComplete = meta => {
    if (meta) {
      metaTriggersAfterSpeech(meta);
    }
    if (waitingToBeSpoken.length > 0) {
      dispatch(removeOldestSpeechFromQueue());
    }
  };

  return (
    <div className="Speak">
      {speech.text !== "" && (
        <TextToSpeech
          incomingText={speech}
          onFinishedSpeaking={() => handleTextToSpeechComplete(speech.meta)}
        />
      )}
    </div>
  );
};

export default Speak;
