import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as aiActions from '../store/actions/ai';
import { options } from 'utils/ai';
import useInterval from '../hooks/useInterval';

const IncomingCommandOfficer = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { firstOnScene, incomingCommandOfficer } = user;

  const [arrived, setArrived] = useState(false);
  const [arrivalAnnounced, setArrivalAnnounced] = useState(false);
  const [arrival, setArrival] = useState(9999);

  useEffect(() => {
    const secondsUntilArrival = Math.floor(
      Math.random() * options.maxIncomingOfficerArrivalSeconds
    );
    setArrival(secondsUntilArrival);
  }, []);

  useInterval(
    () => {
      if (arrival > 0) {
        setArrival(arrival - 1);
      }
    },
    arrived ? 1000 : null
  );

  useEffect(() => {
    if (!arrived && arrival === 0) {
      dispatch(aiActions.incomingCommandOfficerArrived());
      setArrived(true);
    }
  }, [arrival, arrived, dispatch]);

  useEffect(() => {
    const announceArrival = () => {
      const announcement = {
        label: incomingCommandOfficer,
        text: `${firstOnScene} from ${incomingCommandOfficer} can we do a face to face?`,
        voice: options.incomingCommandOfficerVoice,
      };
      dispatch(aiActions.addToSpeechQueue(announcement));
      dispatch(aiActions.faceToFaceRequested());
      setArrivalAnnounced(true);
    };

    if (arrived && !arrivalAnnounced) {
      announceArrival();
    }
  }, [
    arrived,
    arrivalAnnounced,
    firstOnScene,
    incomingCommandOfficer,
    dispatch,
  ]);

  return <div data-testid='incoming-command-officer' />;
};

export default IncomingCommandOfficer;
