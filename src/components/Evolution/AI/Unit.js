import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  addToSpeechQueue,
  incrementUnitsAssigned,
  addAssignedGroup,
  incidentAnnounced
} from "store/actions/ai";
import {
  options,
  anyTermsMatchString,
  randomSelection,
  properPronouns
} from "utils/ai";

const {
  maxUnitArrivalSeconds,
  canReportTerms,
  parReportTerms,
  icsNimsGroups,
  parReport
} = options;

const Unit = ({ name, voice, index }) => {
  const dispatch = useDispatch();
  const { command, incidentCommandName, unitsAssigned } = useSelector(
    state => state.ai
  );
  const {
    incidentGroup,
    incidentCommand,
    withstanding,
    attack,
    ventilation,
    exposure,
    ric,
    medical
  } = useSelector(state => state.evolution);
  const [unitName] = useState(name);
  const [announcement, setAnnouncement] = useState("");
  const [arrived, setArrived] = useState(false);
  const [icsNimsGroup, setIcsNimsGroup] = useState("");

  useEffect(() => {
    const unitSpeech = () => {
      const speech = {
        label: unitName,
        text: announcement,
        voice: voice
      };
      dispatch(addToSpeechQueue(speech));
      setAnnouncement("");
    };

    if (announcement) {
      unitSpeech();
    }
  }, [announcement, unitName, voice, dispatch]);

  useEffect(() => {
    let interval;

    if (unitName) {
      let timeout = 0;
      if (index === 0) {
        timeout = 3;
      } else {
        const minUnitArrivalSeconds = Math.floor(maxUnitArrivalSeconds / 3);
        timeout = Math.floor(
          Math.random() * (maxUnitArrivalSeconds - minUnitArrivalSeconds + 1) +
            minUnitArrivalSeconds
        );
        timeout *= 1000;
      }
      interval = setTimeout(() => {
        setAnnouncement(
          `${unitName} on scene staged requesting an assignment.`
        );
        setArrived(true);
      }, timeout);
    }

    return () => clearTimeout(interval);
  }, [unitName, index, dispatch]);

  useEffect(() => {
    const checkForAssignment = () => {
      icsNimsGroups.forEach(group => {
        if (anyTermsMatchString(command, group.terms)) {
          setIcsNimsGroup(group.name);
          const possibleResponses = [
            `${unitName} copies, I am ${group.name}.`,
            `${incidentCommandName} from ${unitName}. I copy I am ${group.name} group.`,
            `${incidentCommandName} from ${unitName}. I am ${group.name} group.`,
            `${incidentCommandName} from ${unitName}. I copy I will be ${group.name} group.`
          ];
          const assignmentAcknowledgement = randomSelection(possibleResponses);
          const commandRepeat = properPronouns(command);
          setAnnouncement(`${assignmentAcknowledgement} ${commandRepeat}`);
          dispatch(incrementUnitsAssigned());
          dispatch(addAssignedGroup(group.name));
        }
      });
    };

    const checkIfAddressed = () => {
      if (anyTermsMatchString(command, unitName)) {
        checkForAssignment();
      }
    };

    if (!icsNimsGroup && arrived && command) {
      checkIfAddressed();
    }
  }, [arrived, command, icsNimsGroup, unitName, incidentCommandName, dispatch]);

  useEffect(() => {
    const checkForNeeds = () => {
      switch (icsNimsGroup) {
        case "Fire Attack":
          return attack;
        case "Ventilation":
          return ventilation;
        case "Exposure":
          return exposure;
        case "RIC":
          return ric;
        case "Medical":
          return medical;
        default:
          return false;
      }
    };

    const getType = needs => {
      let type = withstanding ? "WITHSTANDING_WITH" : "NOT_WITHSTANDING_WITH";
      type += needs ? "_NEEDS" : "OUT_NEEDS";
      return type;
    };

    const checkForCanReport = () => {
      if (anyTermsMatchString(command, canReportTerms)) {
        const group = icsNimsGroups.find(group => group.name === icsNimsGroup);
        const type = getType(checkForNeeds());
        const canReport = group.canReports.find(report => report.type === type)
          .response;
        setAnnouncement(canReport);
      }
    };

    const checkForParReport = () => {
      if (anyTermsMatchString(command, parReportTerms)) {
        setAnnouncement(parReport);
      }
    };

    const checkIfAddressed = () => {
      if (anyTermsMatchString(command, [unitName, icsNimsGroup])) {
        checkForCanReport();
        checkForParReport();
      }
    };

    if (icsNimsGroup && command) {
      checkIfAddressed();
    }
  }, [
    icsNimsGroup,
    command,
    unitName,
    withstanding,
    attack,
    ventilation,
    exposure,
    ric,
    medical
  ]);

  useEffect(() => {
    const normalizedGroup = () => {
      let group = "";
      switch (incidentGroup) {
        case "FIRE_ATTACK":
          group = "Fire Attack";
          break;
        case "VENTILATION":
          group = "Ventilation";
          break;
        case "EXPOSURE":
          group = "Exposure";
          break;
        case "RIC":
          group = "RIC";
          break;
        case "MEDICAL":
          group = "Medical";
          break;
        default:
          break;
      }
      return group;
    };

    if (icsNimsGroup && unitsAssigned > 2) {
      const group = normalizedGroup();
      if (group === icsNimsGroup) {
        const announcement = incidentCommand.replace("{NAME}", icsNimsGroup);
        setAnnouncement(announcement);
        dispatch(incidentAnnounced());
      }
    }
  }, [icsNimsGroup, unitsAssigned, incidentGroup, incidentCommand, dispatch]);

  return <div></div>;
};

Unit.propTypes = {
  name: PropTypes.string.isRequired,
  voice: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
};

export default Unit;
