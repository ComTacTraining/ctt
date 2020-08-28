import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Predictions } from 'aws-amplify';
import mic from 'microphone-stream';

import * as aiActions from '../store/actions/ai';

const SpeechToText = props => {
  const ai = useSelector(state => state.ai);
  const dispatch = useDispatch();

  const [bytes, setBytes] = useState([]);
  const [started, setStarted] = useState(false);
  const [micStream, setMicStream] = useState();
  const [audioBuffer, setAudioBuffer] = useState(null);

  const { isRecordingMicrophone } = ai;

  useEffect(() => {
    const initBuffer = () => {
      let buffer = [];
      setAudioBuffer({
        reset: () => buffer = [],
        addData: (raw) => {
          console.log('Adding to buffer', raw);
          buffer.concat(...raw)
        },
        getData: () => buffer,
      });
    };

    if (!audioBuffer) {
      initBuffer();
    }
    
  }, [audioBuffer]);

  useEffect(() => {
    const startRecording = async () => {
      audioBuffer.reset();

      window.navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then(stream => {
          const startMic = new mic();

          startMic.setStream(stream);
          startMic.on('data', chunk => {
            let raw = mic.toRaw(chunk);
            if (raw === null) {
              return;
            }
            audioBuffer.addData(raw);
          });

          setStarted(true);
          setMicStream(startMic);
        });
    };
    if (audioBuffer && isRecordingMicrophone) {
      startRecording();
      audioBuffer.log();
    }
  }, [isRecordingMicrophone, audioBuffer]);

  useEffect(() => {
    const stopRecording = async () => {
      micStream.stop();
      setMicStream(null);
      setStarted(false);
    };

    if (!isRecordingMicrophone && started) {
      stopRecording();
      audioBuffer.log();
    }
  }, [isRecordingMicrophone, started, audioBuffer, micStream]);

  useEffect(() => {
    const convertFromBuffer = (bytes) => {
      Predictions.convert({
        transcription: {
          source: {
            bytes
          },
          language: 'en-US'
        }
      })
        .then(({ transcription: { fullText } }) =>
          dispatch(aiActions.updateCompletedTranscript(fullText))
        )
        .catch(err => console.log(JSON.stringify(err, null, 2)));
    };

    if (!isRecordingMicrophone && !started && audioBuffer && audioBuffer.getData().length > 0) {
      convertFromBuffer(audioBuffer.getData());
      audioBuffer.log();
    }
  }, [audioBuffer, isRecordingMicrophone, started, dispatch]);

  return <div />;
};

export default SpeechToText;
