import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DispatchCenter from './DispatchCenter';
import Unit from './Unit';
// import useUnit from '../hooks/useUnit';
import IncomingCommandOfficer from './IncomingCommandOfficer';
import { options, shuffleArray, anyTermsMatchString } from 'utils/ai';

const AI = (props) => {

  const ai = useSelector((state) => state.ai);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [introFinished, setIntroFinished] = useState(false);
  const [availableVoices, setAvailableVoices] = useState([]);
  const [units, setUnits] = useState([]);
  const [unitCommands, setUnitCommands] = useState([]);
  const [unitGroups, setUnitGroups] = useState([]);
  const [unitsAwaitingAssignment, setUnitsAwaitingAssignment] = useState([]);

  const {
    command,
    isSpeaking,
    initialReportCompleted,
    threeSixtyAssessmentCompleted,
    assignmentsCompleted,
    incidentWithinIncidentCompleted,
    faceToFaceCompleted,
    lastPlayedVideo,
  } = ai;

  const { firstOnScene, alarm1 } = user;

  useEffect(() => {
    const {
      voices,
      incomingCommandOfficerVoice,
      dispatchCenterVoice,
    } = options;
    const availableVoices = voices.filter(
      (voice) =>
        voice !== incomingCommandOfficerVoice && voice !== dispatchCenterVoice
    );
    const shuffledVoices = shuffleArray(availableVoices);
    setAvailableVoices(shuffledVoices);
  }, []);

  useEffect(() => {
    const initializeUnits = () => {
      let leftOverVoices = availableVoices;
      const unitNames = alarm1.map((alarm) => alarm.trim());
      const secondOnScene = Math.floor(Math.random() * unitNames.length);
      const newUnits = unitNames.map((unitName, index) => {
        const isSecondOnScene = secondOnScene === index ? true : false;
        const voice = leftOverVoices.shift();
        return {
          commandIndex: index,
          unitName: unitName,
          secondOnScene: isSecondOnScene,
          voice: voice,
        };
      });
      const startingUnitGroups = unitNames.map((unitName) => [unitName]);
      setAvailableVoices(leftOverVoices);
      setUnits(newUnits);
      const emptyArray = Array(newUnits.length);
      setUnitCommands(emptyArray);
      setUnitGroups(startingUnitGroups);
    };

    if (availableVoices.length > 0 && units.length === 0) {
      initializeUnits();
    }
  }, [availableVoices, units, alarm1]);

  useEffect(() => {
    const checkCommand = () => {};

    if (command !== '') {
      checkCommand();
    }
  }, [command, firstOnScene, dispatch]);

  useEffect(() => {
    const processUnitCommand = () => {
      let found = false;
      unitGroups.forEach((names, index) => {
        if (anyTermsMatchString(command, names)) {
          let newUnitCommands = unitCommands;
          newUnitCommands[index] = command;
          setUnitCommands(newUnitCommands);
          found = true;
        }
      });
      if (!found) {
        let newMatch = '';
        const lowercaseCommand = command.toLowerCase();
        if (lowercaseCommand.includes('engine')) {
          newMatch = 'Engine ';
        }
        if (lowercaseCommand.includes('truck')) {
          newMatch = 'Truck ';
        }

        if (newMatch !== '') {
          if (anyTermsMatchString(lowercaseCommand, ['one'])) {
            newMatch += '1';
          }
          if (anyTermsMatchString(lowercaseCommand, ['to', 'too', 'two'])) {
            newMatch += '2';
          }
          if (anyTermsMatchString(lowercaseCommand, ['three'])) {
            newMatch += '3';
          }

          unitGroups.forEach((names, index) => {
            if (anyTermsMatchString(newMatch, names)) {
              let newUnitCommands = unitCommands;
              newUnitCommands[index] = command;
              setUnitCommands(newUnitCommands);
              found = true;
            }
          });
        }
      }
    };

    if (threeSixtyAssessmentCompleted && command !== '') {
      processUnitCommand();
    }
  }, [command, threeSixtyAssessmentCompleted, unitGroups, unitCommands]);

  useEffect(() => {
    if (lastPlayedVideo === 'intro') {
      setIntroFinished(true);
    }
  }, [lastPlayedVideo]);

  const unitArrivedHandler = (aiIndex) => {
    let assignments = unitsAwaitingAssignment;
    assignments.push(aiIndex);
    setUnitsAwaitingAssignment(assignments);
  };

  const unitNameAssignmentHandler = ({ aiIndex, additionalNames }) => {
    const newGroupNames = Array.isArray(additionalNames)
      ? additionalNames
      : [additionalNames];
    const newUnitGroups = unitGroups.map((previousNames, index) => {
      if (index === aiIndex) {
        return [...previousNames, ...newGroupNames];
      }
      return previousNames;
    });
    setUnitGroups(newUnitGroups);
  };


  // return (
  //   <div className='Ai'>
  //     <Speak />
  //     {introFinished && <DispatchCenter />}
  //   </div>
  // );

  return (
    <div className='Ai'>
      {introFinished && <DispatchCenter />}
      {threeSixtyAssessmentCompleted &&
        units.map((unit, i) => (
          <Unit
            key={i}
            aiIndex={i}
            secondOnScene={unit.secondOnScene}
            unitName={unit.unitName}
            voice={unit.voice}
            command={unitCommands[i]}
            onArrived={unitArrivedHandler}
            onAssignment={unitNameAssignmentHandler}
          />
        ))}
      {/* <Incident /> */}
      {assignmentsCompleted && <IncomingCommandOfficer />}
    </div>
  );

    
};

export default AI;
