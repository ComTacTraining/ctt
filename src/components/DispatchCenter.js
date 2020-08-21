import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as aiActions from '../store/actions/ai';
import { options, anyTermsMatchString, randomSelection, strReplace } from 'utils/ai';

const DispatchCenter = (props) => {
  const ai = useSelector((state) => state.ai);
  const evolution = useSelector((state) => state.evolution);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [announcement, setAnnouncement] = useState('');

  const [secondAlarmRequested, setSecondAlarmRequested] = useState(false);
  const [secondAlarmReady, setSecondAlarmReady] = useState(
    options.maxAdditionalAlarmSeconds
  );
  const [secondAlarmAnnounced, setSecondAlarmAnnounces] = useState(false);
  const [thirdAlarmRequested, setThirdAlarmRequested] = useState(false);
  const [thirdAlarmReady, setThirdAlarmReady] = useState(
    options.maxAdditionalAlarmSeconds
  );
  const [thirdAlarmAnnounced, setThirdAlarmAnnounced] = useState(false);
  const [sendingAnnouncement, setSendingAnnouncement] = useState(false);

  const {
    firstAlarmAnnounced,
    initialReportCompleted,
    threeSixtyWalkthroughCompleted,
    threeSixtyAssessmentCompleted,
    assignmentsCompleted,
    incidentWithinIncidentCompleted,
    incomingCommandOfficerArrived,
    faceToFaceRequested,
    faceToFaceCompleted,
    command,
    incidentCommandName,
  } = ai;

  const { street } = evolution;

  const {
    dispatchCenter,
    firstOnScene,
    incomingCommandOfficer,
    alarm1,
    alarm2,
    alarm3,
  } = user;

  // dispatch(aiActions.firstAlarmAnnounced()), //onFirstAlarmAnnounced()
  // dispatch(aiActions.updateIncidentCommandName(name)), //onUpdateIncidentCommandName()
  // dispatch(aiActions.initialReportCompleted()), //onInitialReportCompleted()
  // dispatch(aiActions.threeSixtyAssessmentCompleted()), //onThreeSixtyAssessmentCompleted()

  useEffect(() => {
    const addToSpeechQueue = () => {
      const findStrings = [
        'this is',
        'this',
        'all incoming units from',
        'i will be',
      ];
      const replaceStrings = [
        'has',
        'it',
        '',
        `${incidentCommandName} will be`,
      ];

      const fixedPronounsAnnouncement = strReplace(
        announcement,
        findStrings,
        replaceStrings
      );
      dispatch(
        aiActions.addToSpeechQueue({
          label: dispatchCenter,
          text: fixedPronounsAnnouncement,
          voice: options.dispatchCenterVoice,
        })
      );
      setAnnouncement('');
    };

    if (announcement !== '') {
      addToSpeechQueue();
    }
  }, [announcement, dispatchCenter, incidentCommandName, dispatch]);

  useEffect(() => {
    const announceFirstAlarm = () => {
      const randomIndex = Math.floor(Math.random() * options.dispatchCallOptions.length);
      const call = options.dispatchCallOptions[randomIndex];
      const dispatchAnnouncement = `Structure Fire, ${alarm1.join(', ')}; ${street}.`;
      const announcement = `${dispatchAnnouncement} Repeating, ${dispatchAnnouncement}`;
      dispatch(aiActions.updateScrollingText(announcement));
      setAnnouncement(`${announcement} ${call}`);
    };

    if (!firstAlarmAnnounced) {
      announceFirstAlarm();
    }
  }, [
    firstAlarmAnnounced,
    dispatchCenter,
    alarm1,
    firstOnScene,
    incomingCommandOfficer,
    street,
    dispatch,
  ]);

  useEffect(() => {
    const checkForInitialReport = () => {
      if (anyTermsMatchString(command, options.initialReportTerms)) {
        const incidentName = street.replace(/[0-9]/g, '').trim();
        const commandNames = [`${incidentName} IC`, `${incidentName} Command`];
        const incidentCommandName = randomSelection(commandNames);
        setAnnouncement(`${dispatchCenter} copies, ${command}`);
        dispatch(aiActions.initialReportCompleted());
        // dispatch(aiActions.updateIncidentCommandName(incidentCommandName));
        // dispatch(aiActions.clearCommand());
      }
    };

    const checkForThreeSixtyAssessmentReport = () => {
      if (anyTermsMatchString(command, options.threeSixtyAssessmentTerms)) {
        setAnnouncement(`${dispatchCenter} copies, ${command}`);
        dispatch(aiActions.threeSixtyAssessmentCompleted());
        // dispatch(aiActions.clearCommand());
      }
    };

    if (command !== '') {
      if (!initialReportCompleted) {
        checkForInitialReport();
      } else if (
        threeSixtyWalkthroughCompleted &&
        !threeSixtyAssessmentCompleted
      ) {
        checkForThreeSixtyAssessmentReport();
      }
    }
  }, [
    command,
    initialReportCompleted,
    threeSixtyWalkthroughCompleted,
    threeSixtyAssessmentCompleted,
    street,
    dispatchCenter,
    dispatch,
  ]);

  return <div />;
};

export default DispatchCenter;
