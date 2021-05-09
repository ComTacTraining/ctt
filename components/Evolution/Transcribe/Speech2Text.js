import React, { useState, useCallback, useRef, useEffect } from 'react';

import { useSelector, useDispatch } from "react-redux";
import useKeyPress from "hooks/useKeyPress";
import {
    updatePartialTranscript,
    updateCompletedTranscript,
    addToLog,
    updateSpeechBotState,
    startRecordingMicrophone,
    stopRecordingMicrophone
  } from "store/actions/ai";

import * as util_utf8_node from '@aws-sdk/util-utf8-node';
import * as marshaller from '@aws-sdk/eventstream-marshaller';
import mic from 'microphone-stream';
import { pcmEncode, downsampleBuffer } from './audioUtils';

import useWebSocket, { ReadyState } from 'react-use-websocket';
import { SignalCellularNoSimOutlined } from '@material-ui/icons';

const eventStreamMarshaller = new marshaller.EventStreamMarshaller(util_utf8_node.toUtf8, util_utf8_node.fromUtf8);


const Speech2Text = props => {
    const dispatch = useDispatch();
    const { firstOnScene } = useSelector(state => state.user);
    const isPressed = useKeyPress('Space', true);
    const [languageCode, setLanguageCode] = useState('en-US');
    const [region, setRegion] = useState('us-east-1');
    const [sampleRate, setSampleRate] = useState(44100);
    
    const [lastTranscript, setLastTranscript] = useState("");
    const [currentTranscript, setCurrentTranscript] = useState("");

    const didUnmount = useRef(false);
    const inputSampleRate = useRef(0);
    const micStream = useRef(null);
    const [audioBinary, setAudioBinary] = useState();

    const { speechBotState, isRecordingMicrophone } = useSelector(state => state.ai);
    const getSocketUrl = useCallback(async () => {
        try {
            const response = await fetch("/api/member/voiceurl", {
                method: "POST",
                mode: "same-origin",
                body: JSON.stringify({
                    region: region,
                    languageCode: languageCode,
                    sampleRate: sampleRate
                })
            });
    
            const resUrl = await response.json();
            return resUrl.url;
        } catch {
            console.log("can't make websocket url");
            return null;
        }
        
      }, []);

    const {
        sendMessage,
        sendJsonMessage,
        lastMessage,
        lastJsonMessage,
        readyState,
        getWebSocket
      } = useWebSocket(getSocketUrl, {
        onOpen: () => {
            console.log("opened");
        },
        onMessage: (message) => {
            let messageWrapper = eventStreamMarshaller.unmarshall(Buffer(message.data));
            let messageBody = JSON.parse(String.fromCharCode.apply(String, messageWrapper.body));
            if (messageWrapper.headers[":message-type"].value === "event") {
                handleEventStreamMessage(messageBody);
            }
            else {
                console.log(messageBody.Message);
            }
        },
        onError: (message) => {
            console.log('WebSocket connection error. Try again.');
        },
        //Will attempt to reconnect on all close events, such as server shutting down
        shouldReconnect: (closeEvent) => {
            return didUnmount.current === false;
        },
        reconnectAttempts: 10000,
        reconnectInterval: 1000,

      });

      const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
      }[readyState];

      useEffect(() => {
        return () => {
            didUnmount.current = true;
            closeSocket();
          };
      }, []);

      useEffect(() => {
        console.log(connectionStatus)
        if(connectionStatus === "Open") {
            getWebSocket().binaryType = 'arraybuffer';
            if(speechBotState !== "Processing...") {
                dispatch(updateSpeechBotState("Press the space bar to speak."));
            }

            if(isPressed && !isRecordingMicrophone) {
                
                dispatch(startRecordingMicrophone());
                dispatch(updateSpeechBotState("Listening now...."));
            } else if (!isPressed  && isRecordingMicrophone){
                dispatch(updateSpeechBotState("Processing..."));
                setTimeout(() => {
                    dispatch(updateSpeechBotState("Press the space bar to speak."));
                    dispatch(stopRecordingMicrophone());
                }, 2000);                
            }
        } else {
            dispatch(updateSpeechBotState("Please wait while connecting..."));
        }
    }, [readyState, isPressed]);

      useEffect(() => {
          if (isRecordingMicrophone) {
            dispatch(updatePartialTranscript(lastTranscript + " " + currentTranscript));
          } else {
            if((lastTranscript !== "") || (currentTranscript !== "")) {
                dispatch(updateCompletedTranscript(lastTranscript + " " + currentTranscript));
                dispatch(
                    addToLog({
                        timestamp: Date.now(),
                        label: firstOnScene,
                        text: lastTranscript
                    })
                );
                setLastTranscript("");
                setCurrentTranscript("");
            }
          }
      }, [isRecordingMicrophone, lastTranscript, currentTranscript]);

      useEffect(() => {
          sendMessage(audioBinary);
      }, [audioBinary]);

      useEffect(() => {
          if (isRecordingMicrophone) {
            window.navigator.mediaDevices.getUserMedia({
                video: false,
                audio: true
            })
            .then(streamAudioToWebSocket) 
            .catch(function (error) {
                alert('There was an error streaming your audio to Amazon Transcribe. Please try again.');
            });
          } else {
              if (micStream.current) {
                micStream.current.stop();
              }
          }
      }, [isRecordingMicrophone]);


      const handleEventStreamMessage = (messageJson) => {
        let results = messageJson.Transcript.Results;

        if (results.length > 0) {
            if (results[0].Alternatives.length > 0) {
                let transcript = results[0].Alternatives[0].Transcript;

                transcript = decodeURIComponent(escape(transcript));
                setCurrentTranscript(transcript);
                if (!results[0].IsPartial) {
                    setLastTranscript((prevLastTranscript) => (prevLastTranscript+ " " + transcript));
                    setCurrentTranscript("");
                }
            }
        }
    }

    const streamAudioToWebSocket = async (userMediaStream) => {
        micStream.current = new mic();

        micStream.current.on("format", (data) => {
            inputSampleRate.current = data.sampleRate;
        });

        micStream.current.setStream(userMediaStream);

        micStream.current.on('data', (rawAudioChunk) => {
            let binary = convertAudioToBinaryMessage(rawAudioChunk);
            setAudioBinary(binary);
        });
    }

    const convertAudioToBinaryMessage = (audioChunk) => {
        let raw = mic.toRaw(audioChunk);

        if (raw == null)
            return;

        let downsampledBuffer = downsampleBuffer(raw, inputSampleRate.current, sampleRate);
        let pcmEncodedBuffer = pcmEncode(downsampledBuffer);

        let audioEventMessage = getAudioEventMessage(Buffer.from(pcmEncodedBuffer));

        let binary = eventStreamMarshaller.marshall(audioEventMessage);

        return binary;
    }

    const getAudioEventMessage = (buffer) => {
        return {
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
        };
    }
    const closeSocket = () => {
        micStream.current.stop();
        if (connectionStatus === "Open") {

            let emptyMessage = getAudioEventMessage(Buffer.from(new Buffer([])));
            let emptyBuffer = eventStreamMarshaller.marshall(emptyMessage);
            sendMessage(emptyBuffer);
        }
    }

    return (
        <div id="speech-text">
    
        </div>
    );
}

export default Speech2Text;