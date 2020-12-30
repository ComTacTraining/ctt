import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInterval from "./useInterval";
import { addToSpeechQueue } from "../store/actions/ai";
// import { options } from 'utils/ai';

const useUnit = ({ name, voice, arrivalAnnouncement = null }) => {
  const dispatch = useDispatch();
  const ai = useSelector(state => state.ai);
  const [arrived, setArrived] = useState(false);
  const [secondsUntilArrival, setSecondsUntilArrival] = useState(9999);
  const [icsNims, setIcsNims] = useState("");
  const [confirmedAssignment, setConfirmedAssignment] = useState(false);
  // const [group, setGroup] = useState('');

  useInterval(
    () => {
      if (secondsUntilArrival > 0) {
        setSecondsUntilArrival(secondsUntilArrival - 1);
      }
    },
    arrived ? 1000 : null
  );

  const speak = text => {
    const announcement = {
      label: name,
      text: text,
      voice: voice
    };
    dispatch(addToSpeechQueue(announcement));
  };

  useEffect(() => {
    if (!arrived && arrival === 0) {
      setArrived(true);
    }
  }, [arrival, arrived]);

  useEffect(() => {
    const handleArrivalAnnouncement = () => {
      let text = `${name} on scene staged requesting an assignment.`;
      if (arrivalAnnouncement) {
        text = arrivalAnnouncement;
      }
      speak(text);
    };

    if (arrived) {
      handleArrivalAnnouncement();
    }
  }, [arrived, arrivalAnnouncement, speak]);

  return [arrived, speak, setIcsNims, assign];
};

export default useUnit;
