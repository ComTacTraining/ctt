import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Predictions } from 'aws-amplify';

import * as aiActions from '../store/actions/ai';

const TextToSpeech = props => {
  const ai = useSelector(state => state.ai);
  const { waitingToBeSpoken } = ai;
  const dispatch = useDispatch();

  const [audioCtx, setAudioCtx] = useState(null);
  const [encodedAudio, setEncodedAudio] = useState(null);
  const [decodedAudio, setDecodedAudio] = useState(null);
  const [speech, setSpeech] = useState({});
  const [timer, setTimer] = useState(0);
  const [duration, setDuration] = useState(0);

  const { onFinishedSpeaking } = props;

  useEffect(() => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    setAudioCtx(new AudioContext());
  }, []);

  useEffect(() => {
    if (waitingToBeSpoken.length > 0) {
      setSpeech(waitingToBeSpoken[0]);
      setTimer(Date.now());
    }
  }, [waitingToBeSpoken]);

  useEffect(() => {
    if (
      speech &&
      speech.text &&
      speech.text !== '' &&
      speech.voice &&
      speech.voice !== ''
    ) {
      Predictions.convert({
        textToSpeech: {
          source: { text: speech.text },
          voiceId: speech.voice
        }
      })
        .then(result => {
          setEncodedAudio(result);
          const elapsed = Date.now();
          const delta = (elapsed - timer) / 1000;
          console.log(`${elapsed}: ${delta} seconds to convert text to audio file`);
        })
        .catch(err => console.log(err));
    }
  }, [speech, timer]);

  useEffect(() => {
    if (encodedAudio) {
      audioCtx.decodeAudioData(
        encodedAudio.audioStream,
        buffer => setDecodedAudio(buffer),
        err => console.log({ err })
      );
    }
  }, [encodedAudio, audioCtx]);

  useEffect(() => {
    if (decodedAudio) {
      setDuration(Math.ceil(decodedAudio.duration));
      const source = audioCtx.createBufferSource();
      source.buffer = decodedAudio;
      source.connect(audioCtx.destination);
      source.start(0);
    }
  }, [decodedAudio, audioCtx]);

  useEffect(() => {
    if (duration > 0) {
      setTimeout(() => {
        setDuration(duration - 1);
      }, 1000);
    } else {
      dispatch(aiActions.removeOldestSpeechFromQueue());
      if (onFinishedSpeaking) {
        onFinishedSpeaking();
      }
    }
  }, [duration, onFinishedSpeaking, dispatch]);

  return <div />;
};

export default TextToSpeech;
