import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as aiActions from "store/actions/ai";
import { options, properPronouns, isEmptyObject } from "utils/ai";

const {
  maxIncomingOfficerArrivalSeconds: maxSecs,
  incomingCommandOfficerVoice: voice
} = options;

const IncomingCommandOfficer = props => {
  const dispatch = useDispatch();
  const {
    firstOnScene,
    incomingCommandOfficer,
    faceToFaceRequested,
    faceToFaceCompleted,
    command
  } = useSelector(state => state.user);
  const { incidentCompleted } = useSelector(state => state.ai);
  const [speak, setSpeak] = useState({});

  useEffect(() => {
    const queue = () => {
      dispatch(
        aiActions.addToSpeechQueue({
          label: incomingCommandOfficer,
          text: speak.text,
          voice: voice,
          meta: speak.meta || null
        })
      );
      setSpeak({});
    };

    if (!isEmptyObject(speak)) {
      queue();
    }
  }, [speak, incomingCommandOfficer, dispatch]);

  useEffect(() => {
    let interval;

    const announceArrival = () => {
      const minArrivalSeconds = Math.floor(maxSecs / 3);
      const timeout =
        Math.floor(
          Math.random() * (maxSecs - minArrivalSeconds + 1) + minArrivalSeconds
        ) * 1000;
      interval = setTimeout(() => {
        setSpeak({
          text: `${firstOnScene} from ${incomingCommandOfficer} can we do a face to face?`,
          meta: "INCOMING_COMMAND_ARRIVED"
        });
      }, timeout);
    };

    if (incidentCompleted) {
      announceArrival();
    }

    return () => {
      if (interval) {
        clearTimeout(interval);
      }
    };
  }, [incidentCompleted, firstOnScene, incomingCommandOfficer]);

  useEffect(() => {
    const response = () => {
      const reply = properPronouns(command);
      setSpeak({
        text: reply,
        meta: "INCOMING_COMMAND_RESPONSE"
      });
    };

    console.log("Command", command);
    console.log("Face to Face Requested", faceToFaceRequested);
    console.log("Face to Face Completed", faceToFaceCompleted);
    if (command !== "" && faceToFaceRequested && !faceToFaceCompleted) {
      console.log("Made it.");
      response();
    }
  }, [command, faceToFaceRequested, faceToFaceCompleted]);

  return <div />;
};

export default IncomingCommandOfficer;
