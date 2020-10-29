import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as aiActions from 'store/actions/ai';
import { options, properPronouns } from 'utils/ai';

const IncomingCommandOfficer = (props) => {
  const dispatch = useDispatch();
  const { firstOnScene, incomingCommandOfficer, faceToFaceRequested, command } = useSelector(state => state.user);
  const { incidentCompleted } = useSelector(state => state.ai);

  useEffect(() => {
    let interval;

    if (incidentCompleted) {
      const minArrivalSeconds = Math.floor(options.maxIncomingOfficerArrivalSeconds / 3);
        let timeout = Math.floor(
          Math.random() * (options.maxIncomingOfficerArrivalSeconds - minArrivalSeconds + 1) + minArrivalSeconds
        );
        timeout *= 1000;
      interval = setTimeout(() => {
        const announcement = {
          label: incomingCommandOfficer,
          text: `${firstOnScene} from ${incomingCommandOfficer} can we do a face to face?`,
          voice: options.incomingCommandOfficerVoice,
        };
        dispatch(aiActions.addToSpeechQueue(announcement));
        dispatch(aiActions.faceToFaceRequested());
      }, timeout);
    }

    return () => {
      if (interval) {
        clearTimeout(interval);
      }
    }
  }, [incidentCompleted, firstOnScene, incomingCommandOfficer, dispatch]);

  useEffect(() => {
    const response = () => {
      const reply = properPronouns(command);
      const announcement = {
        label: incomingCommandOfficer,
        text: reply,
        voice: options.incomingCommandOfficerVoice,
      };
      dispatch(aiActions.addToSpeechQueue(announcement));
      dispatch(aiActions.faceToFaceCompleted());
    };

    if (faceToFaceRequested && command) {
      response();
    }
  }, [command, faceToFaceRequested, incomingCommandOfficer, dispatch]);

  return <div />;
};

export default IncomingCommandOfficer;
