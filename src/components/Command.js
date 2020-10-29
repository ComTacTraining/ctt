import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { options, anyTermsMatchString } from 'utils/ai';
import * as aiActions from '../store/actions/ai';

const Command = () => {
  const { 
    initialReportCompleted,
    threeSixtyWalkthroughCompleted,
    threeSixtyAssessmentCompleted,
    secondAlarmRequested, 
    thirdAlarmRequested,
    command
  } = useSelector(state => state.ai);

  const dispatch = useDispatch();

  const {
    initialReportTerms,
    threeSixtyAssessmentTerms,
    secondAlarmTerms,
    thirdAlarmTerms,
    maxAdditionalAlarmSeconds
  } = options;

  // handle initial report
  useEffect(() => {
    if (!initialReportCompleted && command) {
      if (anyTermsMatchString(command, initialReportTerms)) {
        dispatch(aiActions.initialReportCompleted());
      }
    }
  }, [command, initialReportCompleted, dispatch, initialReportTerms]);

  // handle 360 assessment
  useEffect(() => {
    if (threeSixtyWalkthroughCompleted && !threeSixtyAssessmentCompleted && command) {
      if (anyTermsMatchString(command, threeSixtyAssessmentTerms)) {
        dispatch(aiActions.threeSixtyAssessmentCompleted());
      }
    }
  }, [command, threeSixtyWalkthroughCompleted, threeSixtyAssessmentCompleted, dispatch, threeSixtyAssessmentTerms]);


  // handle additional alarm request
  useEffect(() => {
    const checkForAlarm = (terms) => {
      if (anyTermsMatchString(command, terms)) {
        return true
      }
      return false;
    };

    if (!secondAlarmRequested && command) {
      if (checkForAlarm(secondAlarmTerms)) {
        dispatch(aiActions.secondAlarmRequested());
      }
    } else if (!thirdAlarmRequested && secondAlarmRequested && command) {
      if (checkForAlarm(thirdAlarmTerms)) {
        dispatch(aiActions.thirdAlarmRequested());
      }
    }
  }, [command, secondAlarmRequested, thirdAlarmRequested, secondAlarmTerms, thirdAlarmTerms, dispatch]);

  // handle additional alarm timers
  useEffect(() => {
    const max = maxAdditionalAlarmSeconds;
    let interval;

    const prepareAlarm = (num) => {
      const min = Math.floor(max / 2);
      const msecs = Math.floor(Math.random() * (max - min + 1) + min) * 1000;
      interval = setTimeout(() => {
        if (num === 2) {
          dispatch(aiActions.secondAlarmReady());
        } else if (num === 3) {
          dispatch(aiActions.thirdAlarmReady());
        }
      }, msecs);
    }

    if (secondAlarmRequested) {
      prepareAlarm(2);
    } else if (thirdAlarmRequested) {
      prepareAlarm(3);
    }

    return () => {
      if (interval) {
        clearTimeout(interval);
      }
    };
  }, [secondAlarmRequested, thirdAlarmRequested, maxAdditionalAlarmSeconds, dispatch]);

  return (
    <div />
  );
}

export default Command;