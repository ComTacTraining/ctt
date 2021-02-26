import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import useKeyPress from "hooks/useKeyPress";
import {
    updatePartialTranscript,
    updateCompletedTranscript,
    addToLog
  } from "store/actions/ai";

import * as util_utf8_node from '@aws-sdk/util-utf8-node';
import * as marshaller from '@aws-sdk/eventstream-marshaller';
import mic from 'microphone-stream';
import { pcmEncode, downsampleBuffer } from './audioUtils';


const SOCKET_STATE = {
    CLOSED: 'closed',
    CLOSING: 'closing',
    READY: 'ready',
    CONNECTING: 'connecting',
}

const BOT_STATE = {
    WAIT: 'Connecting',
    READY: 'I am ready',
    LISTENING: 'Listening',
    AGAIN: 'Try again',

}

let currentSocketState = SOCKET_STATE.CLOSED;
const eventStreamMarshaller = new marshaller.EventStreamMarshaller(util_utf8_node.toUtf8, util_utf8_node.fromUtf8);
let micStream;
let socketError = false;
let transcribeException = false;


const Speech2Text = props => {
    const dispatch = useDispatch();
    const { firstOnScene } = useSelector(state => state.user);
    const isTalking = useKeyPress('Space', true);
    const [languageCode, setLanguageCode] = useState('en-US');
    const [region, setRegion] = useState('us-east-1');
    const [sampleRate, setSampleRate] = useState(44100);
    const [transcription, setTranscription] = useState('');

    const [currentBotState, setCurrentBotState] = useState(BOT_STATE.READY);
    const startTime = useRef(null);
    const endTime = useRef(null);
    const socket = useRef(null);
    const firstStart = useRef(true); 
    const isSocketCreated = useRef(false);
    const inputSampleRate = useRef(0);
    const isPressed = useRef(false);

    useEffect(() => {
        if(firstStart.current) {
            firstStart.current = false;
            if (!window.navigator.mediaDevices.getUserMedia) {
                alert('We support the latest versions of Chrome, Firefox, Safari, and Edge. Update your browser and try your request again.');
            } else {
                startTime.current = setInterval(() => {
                    if(socket.current){
                    }
                    if(!socket.current) {
                        onStartConverting();
                        setConnectingState(SOCKET_STATE.CONNECTING, BOT_STATE.WAIT);
                    } else if(socket.current.readyState === socket.current.CONNECTING) {
                        setConnectingState(SOCKET_STATE.CONNECTING, BOT_STATE.WAIT);
                    } else if(socket.current.readyState === socket.current.OPEN) {
                        if(isPressed.current) {
                            setConnectingState(SOCKET_STATE.READY, BOT_STATE.LISTENING);

                        } else {
                            setConnectingState(SOCKET_STATE.READY, BOT_STATE.READY);
                        }
                    } else if(socket.current.readyState === socket.current.CLOSING) {
                        setConnectingState(SOCKET_STATE.CLOSING, BOT_STATE.AGAIN);
                    } else if(socket.current.readyState === socket.current.CLOSED) {
                        if(currentSocketState !== SOCKET_STATE.CONNECTING) {
                            setConnectingState(SOCKET_STATE.CONNECTING, BOT_STATE.WAIT);
                            onStartConverting();
                        }    
                    }
                }, 1000);
            }
        }
        
        
        return(() => {
            if(!firstStart.current) {
                clearInterval(startTime.current);
                onStopConverting();
                clearTimeout(endTime.current);
            }
            
        });
    }, []);

    useEffect(() => {
        if(isTalking) {
            clearTimeout(endTime.current);
            isPressed.current = isTalking;
        } else {
            endTime.current = setTimeout(() => {
                isPressed.current = isTalking;
                setTranscription("");
            }, 3000);
        }

    }, [isTalking]);

    const setConnectingState = (_socketState, _botState) => {
        setCurrentBotState(_botState);
        currentSocketState = _socketState;
    }

    const setLanguage = () => {
        if (languageCode == "en-US" || languageCode == "es-US")
            setSampleRate(44100);
        else
            setSampleRate(8000);
    }
    
    const setLocation = () => {
        setRegion("us-east-1");
    }

    const onStartConverting = () => {
        if (isSocketCreated.current) {
            return;
        }
        isSocketCreated.current = true;
        setLanguage();
        setLocation();

        window.navigator.mediaDevices.getUserMedia({
                video: false,
                audio: true
            })
            .then(streamAudioToWebSocket) 
            .catch(function (error) {
                alert('There was an error streaming your audio to Amazon Transcribe. Please try again.');
            });
    }

    const onStopConverting = () => {
        if(!isSocketCreated.current) {
            return;
        }
        isSocketCreated.current = false;
        closeSocket();
    }

    
    const streamAudioToWebSocket = async (userMediaStream) => {
        micStream = new mic();

        micStream.on("format", function(data) {
            inputSampleRate.current = data.sampleRate;
        });

        micStream.setStream(userMediaStream);

        const response = await fetch("api/member/voiceurl", {
            method: "POST",
            mode: "same-origin",
            body: JSON.stringify({
                region: region,
                languageCode: languageCode,
                sampleRate: sampleRate
            })
        });

        const resUrl = await response.json()

        let url = resUrl.url;

        socket.current = new WebSocket(url);
        socket.current.binaryType = "arraybuffer";

        socket.current.onopen = function() {
            micStream.on('data', function(rawAudioChunk) {
                let binary = convertAudioToBinaryMessage(rawAudioChunk);
                if ((socket.current.readyState === socket.current.OPEN) && isPressed.current) {
                    socket.current.send(binary);
                }
            }
        )};

        wireSocketEvents();
    }


    const wireSocketEvents = () => {
        socket.current.onmessage = function (message) {
            let messageWrapper = eventStreamMarshaller.unmarshall(Buffer(message.data));
            let messageBody = JSON.parse(String.fromCharCode.apply(String, messageWrapper.body));
            if (messageWrapper.headers[":message-type"].value === "event") {
                handleEventStreamMessage(messageBody);
            }
            else {
                transcribeException = true;
                console.log(messageBody.Message);
            }
        };

        socket.current.onerror = function () {
            socketError = true;
            console.log('WebSocket connection error. Try again.');
        };
        
        socket.current.onclose = function (closeEvent) {
            micStream.stop();
            isSocketCreated.current = false;

            if (!socketError && !transcribeException) {
                if (closeEvent.code != 1000) {
                    console.log('</i><strong>Streaming Exception</strong><br>' + closeEvent.reason);
                }
            }
        };
    }

    const handleEventStreamMessage = (messageJson) => {
        let results = messageJson.Transcript.Results;

        if (results.length > 0) {
            if (results[0].Alternatives.length > 0) {
                let transcript = results[0].Alternatives[0].Transcript;

                transcript = decodeURIComponent(escape(transcript));

                setTranscription(transcript);
                dispatch(updatePartialTranscript(transcript));
                if (!results[0].IsPartial) {
                    dispatch(updateCompletedTranscript(transcript));
                    dispatch(
                        addToLog({
                          timestamp: Date.now(),
                          label: firstOnScene,
                          text: transcript
                        })
                      );

                }
            }
        }
    }

    const closeSocket = () => {
        if(!socket.current) {
            return;
        }
        
        if (socket.current.readyState === socket.current.OPEN) {
            micStream.stop();

            let emptyMessage = getAudioEventMessage(Buffer.from(new Buffer([])));
            let emptyBuffer = eventStreamMarshaller.marshall(emptyMessage);
            socket.current.send(emptyBuffer);
        }
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

    return (
        <div id="speech-text">
            <h3>{currentBotState}</h3>
             <textarea
                rows="4" 
                cols="50" 
                readOnly 
                value={transcription}
                >
                {transcription}
            </textarea>
        </div>
    );
}

export default Speech2Text;