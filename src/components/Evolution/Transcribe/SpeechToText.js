import React from "react";
import { useDispatch } from "react-redux";
import { Predictions } from "aws-amplify";
import AudioRecorder from "./AudioRecorder";
import * as aiActions from "../../store/actions/ai";

const SpeechToText = props => {
  const dispatch = useDispatch();

  const convertFromBuffer = (bytes, timer) => {
    const convertTimer = Date.now();
    let elapsed = convertTimer;
    const convertDelta = (convertTimer - timer) / 1000;

    console.log(
      `${elapsed}: ${convertDelta} seconds to convert mic stream to audio file`
    );

    Predictions.convert({
      transcription: {
        source: {
          bytes
        },
        language: "en-US"
      }
    })
      .then(({ transcription: { fullText } }) => {
        const transcribeTimer = Date.now();
        elapsed = transcribeTimer;
        const transcribeDelta = (transcribeTimer - convertTimer) / 1000;
        console.log(
          `${elapsed}: ${transcribeDelta} seconds to transcribe audio file to text`
        );

        dispatch(aiActions.updateCompletedTranscript(fullText));
      })
      .catch(err => console.log(JSON.stringify(err, null, 2)));
  };

  return (
    <div>
      <AudioRecorder finishRecording={convertFromBuffer} />
    </div>
  );
};

export default SpeechToText;
