import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Unit from "./Unit";
// import Incident from './Incident';
import { options } from "utils/ai";

// const { maxUnitArrivalSeconds } = options;

const Units = () => {
  const { threeSixtyAssessmentCompleted, faceToFaceRequested } = useSelector(
    state => state.ai
  );
  const { alarm1, firstOnScene, incomingCommandOfficer } = useSelector(
    state => state.user
  );
  const [alarmOneUnits, setAlarmOneUnits] = useState([]);
  const [availableVoices, setAvailableVoices] = useState([]);
  // const [arrivalComplete, setArrivalComplete] = useState(false);
  const { voices, dispatchCenterVoice, incomingCommandOfficerVoice } = options;

  useEffect(() => {
    setAvailableVoices(
      voices
        .filter(
          voice =>
            voice !== dispatchCenterVoice &&
            voice !== incomingCommandOfficerVoice
        )
        .sort(() => {
          return 0.5 - Math.random();
        })
    );
  }, [voices, dispatchCenterVoice, incomingCommandOfficerVoice]);

  useEffect(() => {
    if (threeSixtyAssessmentCompleted && !faceToFaceRequested) {
      setAlarmOneUnits(
        alarm1.filter(
          alarm => alarm !== firstOnScene && alarm !== incomingCommandOfficer
        )
      );
    }
  }, [
    threeSixtyAssessmentCompleted,
    faceToFaceRequested,
    alarm1,
    firstOnScene,
    incomingCommandOfficer
  ]);

  return (
    <div>
      {alarmOneUnits.map((alarm, i) => {
        return (
          <Unit name={alarm} voice={availableVoices[i]} key={alarm} index={i} />
        );
      })}
      {/* {arrivalComplete && <Incident />} */}
    </div>
  );
};

export default Units;
