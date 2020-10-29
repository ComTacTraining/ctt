import React, { useState, useRef } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import crypto from 'crypto';
import v4 from './aws-signature-v4';
import { EventStreamMarshaller } from '@aws-sdk/eventstream-marshaller';
import { toUtf8, fromUtf8 } from '@aws-sdk/util-utf8-node';
import mic from 'microphone-stream';
import { pcmEncode, downsampleBuffer } from 'utils/audio';
// import { updatePartialTranscript, updateCompletedTranscript } from 'store/actions/ai';

const eventStreamMarshaller = new EventStreamMarshaller(toUtf8, fromUtf8);

const Transcribe = () => {
  // const dispatch = useDispatch();
  // const { isRecordingMicrophone } = useSelector(state => state.ai);
  const socket = useRef(null);
  const micStream = useRef(null);
  const [error, setError] = useState(null);
  const [command, setCommand] = useState('');

  const radioOnHandler = () => {
    window.navigator.mediaDevices.getUserMedia({ video: false, audio: true })
      .then(toWebSocket) 
      .catch((err) => {
        setError('There was an error streaming your audio to Amazon Transcribe. Please try again.');
      });
  };

  const toWebSocket = (audio) => {
    micStream.current = new mic();
    micStream.setStream(audio);
    let url = presignedUrl();
    socket.current = new WebSocket(url);
    socket.current.binaryType = "arraybuffer";
    socket.current.onopen = () => {
      micStream.on('data', (rawAudioChunk) => {
        let binary = toBinary(rawAudioChunk);
        if (socket.current.readyState === socket.current.OPEN) {
          socket.current.send(binary);
        }
      }
    )};
    wireEvents();
  };

  const presignedUrl = () => {
    let endpoint = "transcribestreaming.us-west-2.amazonaws.com:8443";

    let url = v4.createPresignedURL(
        'GET',
        endpoint,
        '/stream-transcription-websocket',
        'transcribe',
        crypto.createHash('sha256').update('', 'utf8').digest('hex'), {
            'key': process.env.REACT_APP_VOICE_AGENT_KEY,
            'secret': process.env.REACT_APP_VOICE_AGENT_SECRET,
            'protocol': 'wss',
            'expires': 15,
            'region': 'us-west-2',
            'query': 'language-code=en-US&media-encoding=pcm&sample-rate=44100'
        }
    );
    return url;
  }

  const toBinary = (audio) => {
    let raw = mic.toRaw(audio);

    if (raw == null)
        return;

    let downsampled = downsampleBuffer(raw);
    let pcm = pcmEncode(downsampled);
    let message = toMessage(Buffer.from(pcm));
    let binary = eventStreamMarshaller.marshall(message);
    return binary;
  }

  const toMessage = (buffer) => ({
    headers: {
      ':message-type': {
        type: 'string',
        value: 'event'
      },
      ':event-type': {
        type: 'string',
        value: 'AudioEvent'
      }
    },
    body: buffer
  });

  const wireEvents = () => {
    socket.current.onmessage = (message) => {
      let wrapper = eventStreamMarshaller.unmarshall(Buffer(message.data));
      let body = JSON.parse(String.fromCharCode.apply(String, wrapper.body));
      if (wrapper.headers[":message-type"].value === "event") {
        handleMessage(body);
      } 
      else {
        setError(body.Message);
      }
    };

    socket.current.onerror = function () {
      setError('WebSocket connection error. Try again.');
    };
    
    socket.current.onclose = (e) => {
      micStream.current.stop();
      if (!error) {
        if (e.code !== 1000) {
          setError(`Streaming Exception: ${e.reason}`);
        }
      }
    };
  }

  let handleMessage = (json) =>{
    let results = json.Transcript.Results;

    if (results.length > 0) {
      if (results[0].Alternatives.length > 0) {
        let transcript = results[0].Alternatives[0].Transcript;
        transcript = decodeURIComponent(escape(transcript));
        setCommand(`${command} ${transcript}`);
        if (!results[0].IsPartial) {
          setCommand(`${command} ${transcript}`);
        }
      }
    }
  }
  return (
  <div className="transcribe">
    {error && <p>{error}</p>}
    <p>{command}</p>
    <button onClick={() => radioOnHandler}>Turn on radio</button>
  </div>
  );
}

export default Transcribe;
  