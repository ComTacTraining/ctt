import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { options } from "utils/tips";
import * as tipsActions from "store/actions/tips";

const Tips = () => {
  const {
    firstAlarmAnnounced,
    threeSixtyWalkthroughBegan,
    threeSixtyWalkthroughCompleted,
    threeSixtyAssessmentCompleted,
    assignmentsCompleted,
    faceToFaceRequested,
    // incidentCompleted,
    // unitsAssigned,
    isPartialCommand,
    partialCommand,
    command
  } = useSelector(state => state.ai);
  const dispatch = useDispatch();
  const [partialSectionText, setPartialSectionText] = useState("");
  const [fullSectionText, setFullSectionText] = useState([]);

  const allText = (full, partial) => {
    let text = "";
    for (let i = 0; i < full.length; i++) {
      text = `${text} ${full[i]}`;
    }
    return `${text} ${partial}`.toLowerCase();
  };

  useEffect(() => {
    if (isPartialCommand && partialCommand !== "") {
      setPartialSectionText(partialCommand);
    } else if (!isPartialCommand && command !== "") {
      setFullSectionText(command);
      setPartialSectionText("");
    }
  }, [isPartialCommand, partialCommand, command]);

  useEffect(() => {
    if (firstAlarmAnnounced && !threeSixtyWalkthroughBegan) {
      setFullSectionText([]);
      setPartialSectionText("");
    } else if (
      threeSixtyWalkthroughCompleted &&
      !threeSixtyAssessmentCompleted
    ) {
      setFullSectionText([]);
      setPartialSectionText("");
    } else if (threeSixtyAssessmentCompleted && !assignmentsCompleted) {
      setFullSectionText([]);
      setPartialSectionText("");
    }
  }, [
    firstAlarmAnnounced,
    threeSixtyWalkthroughBegan,
    threeSixtyWalkthroughCompleted,
    threeSixtyAssessmentCompleted,
    assignmentsCompleted
  ]);

  useEffect(() => {
    if (firstAlarmAnnounced && !threeSixtyWalkthroughBegan) {
      const commands = allText(fullSectionText, partialSectionText);
      options.initialReportSize.forEach(phrase => {
        if (commands.includes(phrase)) {
          dispatch(tipsActions.addressedInitialReportSize());
        }
      });
      options.initialReportHeight.forEach(phrase => {
        if (commands.includes(phrase)) {
          dispatch(tipsActions.addressedInitialReportHeight());
        }
      });
      options.initialReportOccupancy.forEach(phrase => {
        if (commands.includes(phrase)) {
          dispatch(tipsActions.addressedInitialReportOccupancy());
        }
      });
      options.initialReportConditions.forEach(phrase => {
        if (commands.includes(phrase)) {
          dispatch(tipsActions.addressedInitialReportConditions());
        }
      });
      options.initialReportActions.forEach(phrase => {
        if (commands.includes(phrase)) {
          dispatch(tipsActions.addressedInitialReportActions());
        }
      });
      options.initialReportNeeds.forEach(phrase => {
        if (commands.includes(phrase)) {
          dispatch(tipsActions.addressedInitialReportNeeds());
        }
      });
      options.initialReportDesignation.forEach(phrase => {
        if (commands.includes(phrase)) {
          dispatch(tipsActions.addressedInitialReportDesignation());
        }
      });
    }
  }, [
    firstAlarmAnnounced,
    threeSixtyWalkthroughBegan,
    fullSectionText,
    partialSectionText,
    dispatch
  ]);

  useEffect(() => {
    if (threeSixtyWalkthroughCompleted && !threeSixtyAssessmentCompleted) {
      const commands = allText(fullSectionText, partialSectionText);
      options.threeSixtyConstruction.forEach(phrase => {
        if (commands.includes(phrase)) {
          dispatch(tipsActions.addressedThreeSixtyConstruction());
        }
      });
      options.threeSixtyEntryEgress.forEach(phrase => {
        if (commands.includes(phrase)) {
          dispatch(tipsActions.addressedThreeSixtyEntryEgress());
        }
      });
      options.threeSixtyConditions.forEach(phrase => {
        if (commands.includes(phrase)) {
          dispatch(tipsActions.addressedThreeSixtyConditions());
        }
      });
      options.threeSixtyInteriorPath.forEach(phrase => {
        if (commands.includes(phrase)) {
          dispatch(tipsActions.addressedThreeSixtyInteriorPath());
        }
      });
      options.threeSixtySurvivability.forEach(phrase => {
        if (commands.includes(phrase)) {
          dispatch(tipsActions.addressedThreeSixtySurvivability());
        }
      });
      options.threeSixtyStrategicMode.forEach(phrase => {
        if (commands.includes(phrase)) {
          dispatch(tipsActions.addressedThreeSixtyStrategicMode());
        }
      });
    }
  }, [
    threeSixtyWalkthroughCompleted,
    threeSixtyAssessmentCompleted,
    fullSectionText,
    partialSectionText,
    dispatch
  ]);

  useEffect(() => {
    if (
      threeSixtyAssessmentCompleted &&
      (!assignmentsCompleted || !faceToFaceRequested)
    ) {
      const commands = allText(fullSectionText, partialSectionText);
      options.assignmentRescue.forEach(phrase => {
        if (commands.includes(phrase)) {
          dispatch(tipsActions.addressedAssignmentRescue());
        }
      });
      options.assignmentExposure.forEach(phrase => {
        if (commands.includes(phrase)) {
          dispatch(tipsActions.addressedAssignmentExposure());
        }
      });
      options.assignmentConfinement.forEach(phrase => {
        if (commands.includes(phrase)) {
          dispatch(tipsActions.addressedAssignmentConfinement());
        }
      });
      options.assignmentExtinguishment.forEach(phrase => {
        if (commands.includes(phrase)) {
          dispatch(tipsActions.addressedAssignmentExtinguishment());
        }
      });
      options.assignmentOverhaul.forEach(phrase => {
        if (commands.includes(phrase)) {
          dispatch(tipsActions.addressedAssignmentOverhaul());
        }
      });
      options.assignmentVentilation.forEach(phrase => {
        if (commands.includes(phrase)) {
          dispatch(tipsActions.addressedAssignmentVentilation());
        }
      });
      options.assignmentSalvage.forEach(phrase => {
        if (commands.includes(phrase)) {
          dispatch(tipsActions.addressedAssignmentSalvage());
        }
      });
    }
  }, [
    threeSixtyAssessmentCompleted,
    assignmentsCompleted,
    faceToFaceRequested,
    fullSectionText,
    partialSectionText,
    dispatch
  ]);

  // useEffect(() => {
  //   if (threeSixtyAssessmentCompleted && unitsAssigned > 2 && !incidentCompleted && assignments !== '') {
  //     options.incidentWithinIncident.forEach((phrase) => {
  //       if (assignments.includes(phrase)) {
  //         dispatch(tipsActions.addressedIncidentWithinIncident());
  //       }
  //     });

  //   }
  // }, [threeSixtyAssessmentCompleted, unitsAssigned, incidentCompleted, isPartialCommand, partialCommand, dispatch]);

  return <div className="Tips"></div>;
};

export default Tips;
