import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as aiActions from '../store/actions/ai';
import { options, anyTermsMatchString, randomSelection } from 'utils/ai';
import useInterval from '../hooks/useInterval';

const Unit = (props) => {
  const user = useSelector((state) => state.user);
  const { firstOnScene } = user;
  const dispatch = useDispatch();

  const [arrived, setArrived] = useState(false);
  const [arrivalAnnounced, setArrivalAnnounced] = useState(false);
  const [arrival, setArrival] = useState(9999);
  const [icsNims, setIcsNims] = useState('');
  const [group, setGroup] = useState('');
  const [confirmedAssignment, setConfirmedAssignment] = useState(false);

  const {
    aiIndex,
    secondOnScene,
    unitName,
    voice,
    command,
    onArrived,
    onAssignment,
  } = props;

  // useEffect(() => {
  //   const secondsUntilArrival = secondOnScene
  //     ? 0
  //     : Math.floor(Math.random() * options.maxUnitArrivalSeconds);
  //   setArrival(secondsUntilArrival);
  // }, [secondOnScene]);

  // useInterval(
  //   () => {
  //     if (arrival > 0) {
  //       setArrival(arrival - 1);
  //     }
  //   },
  //   arrived ? 1000 : null
  // );

  useEffect(() => {
    if (!arrived && arrival === 0) {
      setArrived(true);
      onArrived(aiIndex);
    }
  }, [arrival, arrived, aiIndex, onArrived]);

  useEffect(() => {
    const announceArrival = () => {
      const announcement = {
        label: unitName,
        text: `${unitName} on scene staged requesting an assignment.`,
        voice: voice,
      };
      dispatch(aiActions.addToSpeechQueue(announcement));
      setArrivalAnnounced(true);
    };

    if (arrived && !arrivalAnnounced) {
      announceArrival();
    }
  }, [arrived, arrivalAnnounced, unitName, voice, dispatch]);

  useEffect(() => {
    const assignIcsNimsGroup = () => {
      options.icsNimsGroups.forEach((group) => {
        if (anyTermsMatchString(command, group.terms)) {
          setIcsNims(group.name);
        }
      });
    };

    if (icsNims === '') {
      assignIcsNimsGroup();
    }
  }, [command, icsNims]);

  useEffect(() => {
    if (icsNims !== '') {
      setGroup(icsNims);
      const assignment = {
        aiIndex: aiIndex,
        additionalNames: icsNims,
      };
      onAssignment(assignment);
    }
  }, [icsNims, aiIndex, onAssignment]);

  useEffect(() => {
    const prepareAssignmentResponse = () => {
      const speechPatterns = [
        `${unitName} copies, I am ${group}.`,
        `${firstOnScene} from ${unitName}. I copy I am ${group} group.`,
        `${firstOnScene} from ${unitName}. I am ${group} group.`,
        `${firstOnScene} from ${unitName}. I copy I will be ${group} group.`,
      ];
      const copy = randomSelection(speechPatterns);
      // const findStrings = ['your', 'you are'];
      // const replaceStrings = ['my', 'I am'];
      // const repeatCommand = strReplace(command, findStrings, replaceStrings);
      // @todo: remove assignment statement from repeatCommand
      //const response = `${copy} ${repeatCommand}`;
      const response = `${copy}`;
      const item = {
        label: unitName,
        text: response,
        voice: voice,
      };
      setConfirmedAssignment(true);
      dispatch(aiActions.addToSpeechQueue(item));
    };

    if (!confirmedAssignment && group) {
      prepareAssignmentResponse();
    }
  }, [
    command,
    confirmedAssignment,
    group,
    unitName,
    voice,
    firstOnScene,
    dispatch,
  ]);

  useEffect(() => {
    const processReport = (textResponse) => {
      const response = {
        label: unitName,
        text: textResponse,
        voice: voice,
      };
      dispatch(aiActions.addToSpeechQueue(response));
    };

    const checkForReportRequests = () => {
      if (confirmedAssignment && anyTermsMatchString(command, 'can report')) {
        const canReport = options.canReports.filter(
          (report) => report.icsNimsGroup === icsNims
        );
        processReport(canReport.response);
      }

      if (confirmedAssignment && anyTermsMatchString(command, 'par report')) {
        processReport(options.parReport);
      }
    };

    if (command !== '') {
      checkForReportRequests();
    }
  }, [command, unitName, icsNims, confirmedAssignment, voice, dispatch]);

  return <div />;
};

export default Unit;
