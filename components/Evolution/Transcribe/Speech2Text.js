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

// our converter between binary event streams messages and JSON
const eventStreamMarshaller = new marshaller.EventStreamMarshaller(util_utf8_node.toUtf8, util_utf8_node.fromUtf8);

// our global variables for managing state
let inputSampleRate;
let socket;
let micStream;
let socketError = false;
let transcribeException = false;


const SOCKET_STATE = {
    CLOSED: 'closed',
    CLOSING: 'closing',
    READY: 'ready',
    CONNECTING: 'connecting',
}

const BOT_STATE = {
    WAIT: 'pleas wait',
    READY: 'I am ready',
    LISTENING: 'Listening',
    AGAIN: 'Try again',

}
let currentSocketState = SOCKET_STATE.CLOSED;


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

    useEffect(() => {
        if (!window.navigator.mediaDevices.getUserMedia) {
            alert('We support the latest versions of Chrome, Firefox, Safari, and Edge. Update your browser and try your request again.');
        
        }
    }, []);

    useEffect(() => {
        if(isTalking) {
            clearInterval(endTime.current);
            startTime.current = setInterval(() => {
                if(!socket) {
                    onStartConverting();
                    setConnectingState(SOCKET_STATE.CONNECTING, BOT_STATE.WAIT);
                } else if(socket.readyState === socket.CONNECTING) {
                    setConnectingState(SOCKET_STATE.CONNECTING, BOT_STATE.WAIT);
                } else if(socket.readyState === socket.OPEN) {
                    setConnectingState(SOCKET_STATE.READY, BOT_STATE.LISTENING);
                } else if(socket.readyState === socket.CLOSING) {
                    setConnectingState(SOCKET_STATE.CLOSING, BOT_STATE.AGAIN);
                } else if(socket.readyState === socket.CLOSED) {
                    if(currentSocketState !== SOCKET_STATE.CONNECTING) {
                        setConnectingState(SOCKET_STATE.CONNECTING, BOT_STATE.WAIT);
                        onStartConverting();
                    }
                    
                }
            }, 300);
        } else {
            clearInterval(startTime.current);
            endTime.current = setInterval(() => {
                if(!socket) {
                } else if(socket.readyState === socket.CONNECTING) {
                    setConnectingState(SOCKET_STATE.CONNECTING, BOT_STATE.WAIT);
                } else if(socket.readyState === socket.OPEN) {
                    if (currentSocketState !== SOCKET_STATE.CLOSING) {
                        setConnectingState(SOCKET_STATE.CLOSING, BOT_STATE.WAIT);
                        onStopConverting();
                    }

                } else if(socket.readyState === socket.CLOSING) {
                    setConnectingState(SOCKET_STATE.CLOSING, BOT_STATE.WAIT);
                } else if(socket.readyState === socket.CLOSED) {
                    setConnectingState(SOCKET_STATE.CLOSED, BOT_STATE.READY);
                    setTranscription('')
                    clearInterval(endTime.current);
                }
            }, 1100);
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
        setLanguage();
        setLocation();

        // first we get the microphone input from the browser (as a promise)...
        window.navigator.mediaDevices.getUserMedia({
                video: false,
                audio: true
            })
            // ...then we convert the mic stream to binary event stream messages when the promise resolves 
            .then(streamAudioToWebSocket) 
            .catch(function (error) {
                alert('There was an error streaming your audio to Amazon Transcribe. Please try again.');
            });
    }

    const onStopConverting = () => {
        closeSocket();
    }

    
    const streamAudioToWebSocket = async (userMediaStream) => {
        //let's get the mic input from the browser, via the microphone-stream module
        micStream = new mic();

        micStream.on("format", function(data) {
            inputSampleRate = data.sampleRate;
        });

        micStream.setStream(userMediaStream);

        // Pre-signed URLs are a way to authenticate a request (or WebSocket connection, in this case)
        // via Query Parameters. Learn more: https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-query-string-auth.html
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

        //open up our WebSocket connection
        socket = new WebSocket(url);
        socket.binaryType = "arraybuffer";

        // when we get audio data from the mic, send it to the WebSocket if possible
        socket.onopen = function() {
            micStream.on('data', function(rawAudioChunk) {
                // the audio stream is raw audio bytes. Transcribe expects PCM with additional metadata, encoded as binary
                let binary = convertAudioToBinaryMessage(rawAudioChunk);

                if (socket.readyState === socket.OPEN)
                    socket.send(binary);
            }
        )};

        // handle messages, errors, and close events
        wireSocketEvents();
    }


    const wireSocketEvents = () => {
        // handle inbound messages from Amazon Transcribe
        socket.onmessage = function (message) {
            //convert the binary event stream message to JSON
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

        socket.onerror = function () {
            socketError = true;
            alert('WebSocket connection error. Try again.');
        };
        
        socket.onclose = function (closeEvent) {
            micStream.stop();
            
            // the close event immediately follows the error event; only handle one.
            if (!socketError && !transcribeException) {
                if (closeEvent.code != 1000) {
                    alert('</i><strong>Streaming Exception</strong><br>' + closeEvent.reason);
                }
            }
        };
    }

    const handleEventStreamMessage = (messageJson) => {
        let results = messageJson.Transcript.Results;

        if (results.length > 0) {
            if (results[0].Alternatives.length > 0) {
                let transcript = results[0].Alternatives[0].Transcript;

                // fix encoding for accented characters
                transcript = decodeURIComponent(escape(transcript));

                // update the textarea with the latest result
                setTranscription(transcript);
                dispatch(updatePartialTranscript(transcript));
                // if this transcript segment is final, add it to the overall transcription
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
        if(!socket) {
            return;
        }
        
        if (socket.readyState === socket.OPEN) {
            micStream.stop();

            // Send an empty frame so that Transcribe initiates a closure of the WebSocket after submitting all transcripts
            let emptyMessage = getAudioEventMessage(Buffer.from(new Buffer([])));
            let emptyBuffer = eventStreamMarshaller.marshall(emptyMessage);
            socket.send(emptyBuffer);
        }
    }


    const convertAudioToBinaryMessage = (audioChunk) => {
        let raw = mic.toRaw(audioChunk);

        if (raw == null)
            return;

        // downsample and convert the raw audio bytes to PCM
        let downsampledBuffer = downsampleBuffer(raw, inputSampleRate, sampleRate);
        let pcmEncodedBuffer = pcmEncode(downsampledBuffer);

        // add the right JSON headers and structure to the message
        let audioEventMessage = getAudioEventMessage(Buffer.from(pcmEncodedBuffer));

        //convert the JSON object + headers into a binary event stream message
        let binary = eventStreamMarshaller.marshall(audioEventMessage);

        return binary;
    }

    const getAudioEventMessage = (buffer) => {
        // wrap the audio data in a JSON envelope
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