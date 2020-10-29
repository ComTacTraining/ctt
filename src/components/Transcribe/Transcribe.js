import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import crypto from 'crypto';
import v4 from './aws-signature-v4';
import { EventStreamMarshaller } from '@aws-sdk/eventstream-marshaller';
import { toUtf8, fromUtf8 } from '@aws-sdk/util-utf8-node';
import mic from 'microphone-stream';
import { pcmEncode, downsampleBuffer, jsonAudioEventMessage } from 'utils/audio';
import { 
  updatePartialTranscript, 
  updateCompletedTranscript,
  addToTranscript
} from 'store/actions/ai';

const eventStreamMarshaller = new EventStreamMarshaller(toUtf8, fromUtf8);

const Transcribe = () => {
  const dispatch = useDispatch();
  const { isRecordingMicrophone } = useSelector(state => state.ai);
  const { firstOnScene } = useSelector(state => state.user);
  const socket = useRef(null);
  const micStream = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  // const [presignedUrl, setPresignedUrl] = useState(null);

  // useEffect(() => {
  //   const getUrl = () => {
  //     return v4.createPresignedURL(
  //       'GET',
  //       'transcribestreaming.us-west-2.amazonaws.com:8443',
  //       '/stream-transcription-websocket',
  //       'transcribe',
  //       crypto.createHash('sha256').update('', 'utf8').digest('hex'), 
  //       {
  //         'key': process.env.REACT_APP_VOICE_AGENT_KEY,
  //         'secret': process.env.REACT_APP_VOICE_AGENT_SECRET,
  //         'protocol': 'wss',
  //         'expires': 15,
  //         'region': 'us-west-2',
  //         'query': "language-code=en-US&media-encoding=pcm&sample-rate=44100"
  //       });
  //   }
  //   if (!presignedUrl) {
  //     const url = getUrl();
  //     setPresignedUrl(url);
  //   }
  // }, [presignedUrl]);

  useEffect(() => {
    const setupStream = () => {
      window.navigator.mediaDevices.getUserMedia({ video: false, audio: true })
      .then(stream => { 
        micStream.current = new mic();
        micStream.current.setStream(stream);
          
        socket.current = new WebSocket(v4.createPresignedURL(
          'GET',
          'transcribestreaming.us-west-2.amazonaws.com:8443',
          '/stream-transcription-websocket',
          'transcribe',
          crypto.createHash('sha256').update('', 'utf8').digest('hex'), 
          {
            'key': process.env.REACT_APP_VOICE_AGENT_KEY,
            'secret': process.env.REACT_APP_VOICE_AGENT_SECRET,
            'protocol': 'wss',
            'expires': 15,
            'region': 'us-west-2',
            'query': "language-code=en-US&media-encoding=pcm&sample-rate=44100"
          }));
        socket.current.binaryType = 'arraybuffer';
        socket.current.onopen = () => {
          micStream.current.on('data', (rawAudioChunk) => {
            const raw = mic.toRaw(rawAudioChunk);
            if (raw === null) {
              return;
            }
            const downsampledBuffer = downsampleBuffer(raw, 44100);
            const pcmEncodedBuffer = pcmEncode(downsampledBuffer);
            const audioEventMessage = jsonAudioEventMessage(Buffer.from(pcmEncodedBuffer));
            const binary = eventStreamMarshaller.marshall(audioEventMessage);
            if (socket.current.readyState === socket.current.OPEN) {
              socket.current.send(binary);
            }
          });
        }
        socket.current.onmessage = (message) => {
          const messageWrapper = eventStreamMarshaller.unmarshall(Buffer(message.data));
          const messageBody = JSON.parse(String.fromCharCode.apply(String, messageWrapper.body));
          if (messageWrapper.headers[":message-type"].value === "event") {
            const results = messageBody.Transcript.Results;
        
            if (results.length > 0) {
              if (results[0].Alternatives.length > 0) {
                let transcript = results[0].Alternatives[0].Transcript;
                transcript = decodeURIComponent(escape(transcript));
                console.log(transcript);
                if (!results[0].IsPartial) {
                  dispatch(updateCompletedTranscript(transcript));
                  dispatch(addToTranscript({ label: firstOnScene, text: transcript }))
                  socket.current.close();
                } else {
                  dispatch(updatePartialTranscript(transcript + "\n"));
                }
              }
            }
          }
          else {
            console.log(messageBody.Message);
          }
        };
        socket.current.onerror = (err) => {
          console.log('WebSocket connection error. Try again.', err);
        };
      });
      setIsOpen(true);
    }

    if (isRecordingMicrophone) {
      if (!isOpen)  {
        setupStream();
      }
    }

    // return () => {
    //   if (socket.current) {
    //     socket.current.close();
    //   }
    //   if (micStream.current) {
    //     micStream.current.stop();
    //   }
    // }
  }, [isRecordingMicrophone, isOpen, firstOnScene, dispatch]);

  // useEffect(() => {
  //   if (micStream.current) {
  //     if (isRecordingMicrophone) {
  //       micStream.current.playRecording();
  //     } else {
  //       micStream.current.pauseRecording();
  //     }
  //   }
  // }, [isRecordingMicrophone]);

  return (
  <div className="transcribe"></div>
  );
}

export default Transcribe;
