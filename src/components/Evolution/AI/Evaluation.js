import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { options } from "utils/evaluation";
import * as evalActions from "store/actions/evaluation";

const Evaluation = () => {
  const dispatch = useDispatch();
  const {
    size,
    height,
    occupancy,
    witnessed,
    actions,
    needs,
    designation,
    construction,
    entryEgress,
    conditions,
    interiorPath,
    survivability,
    priorities,
    tacticalSizeup,
    tacticalLocate,
    tacticalIdentify,
    tacticalCool,
    tacticalExtinguish,
    tacticalRescue,
    tacticalSalvage,
    strategicRescue,
    strategicExposures,
    strategicConfinement,
    strategicExtinguishment,
    strategicOverhaul,
    strategicVentilation,
    strategicSalvage,
    incident,
    par,
    can,
    transferAssignments
  } = useSelector(state => state.evaluation);
  const {
    firstAlarmAnnounced,
    initialReportCompleted,
    threeSixtyWalkthroughCompleted,
    threeSixtyAssessmentCompleted,
    command
  } = useSelector(state => state.ai);

  useEffect(() => {
    const checkMatches = ({ addressed, phrases, action }) => {
      if (!addressed) {
        phrases.forEach(phrase => {
          if (command.includes(phrase)) {
            dispatch(action);
          }
        });
      }
    };

    const checkAnytime = () => {
      const items = [
        {
          addressed: tacticalSizeup,
          phrases: options.tacticalSizeup,
          action: evalActions.addressedTacticalSizeup()
        },
        {
          addressed: tacticalLocate,
          phrases: options.tacticalLocate,
          action: evalActions.addressedTacticalLocate()
        },
        {
          addressed: tacticalIdentify,
          phrases: options.tacticalIdentify,
          action: evalActions.addressedTacticalIdentify()
        },
        {
          addressed: tacticalCool,
          phrases: options.tacticalCool,
          action: evalActions.addressedTacticalCool()
        },
        {
          addressed: tacticalExtinguish,
          phrases: options.tacticalExtinguish,
          action: evalActions.addressedTacticalExtinguish()
        },
        {
          addressed: tacticalRescue,
          phrases: options.tacticalRescue,
          action: evalActions.addressedTacticalRescue()
        },
        {
          addressed: tacticalSalvage,
          phrases: options.tacticalSalvage,
          action: evalActions.addressedTacticalSalvage()
        },
        {
          addressed: strategicRescue,
          phrases: options.strategicRescue,
          action: evalActions.addressedStrategicRescue()
        },
        {
          addressed: strategicExposures,
          phrases: options.strategicExposures,
          action: evalActions.addressedStrategicExposures()
        },
        {
          addressed: strategicConfinement,
          phrases: options.strategicConfinement,
          action: evalActions.addressedStrategicConfinement()
        },
        {
          addressed: strategicExtinguishment,
          phrases: options.strategicExtinguishment,
          action: evalActions.addressedStrategicExtinguishment()
        },
        {
          addressed: strategicOverhaul,
          phrases: options.strategicOverhaul,
          action: evalActions.addressedStrategicOverhaul()
        },
        {
          addressed: strategicVentilation,
          phrases: options.strategicVentilation,
          action: evalActions.addressedStrategicVentilation()
        },
        {
          addressed: strategicSalvage,
          phrases: options.strategicSalvage,
          action: evalActions.addressedStrategicSalvage()
        },
        {
          addressed: incident,
          phrases: options.incident,
          action: evalActions.addressedIncident()
        },
        {
          addressed: par,
          phrases: options.par,
          action: evalActions.addressedPar()
        },
        {
          addressed: can,
          phrases: options.can,
          action: evalActions.addressedCan()
        },
        {
          addressed: transferAssignments,
          phrases: options.transferAssignments,
          action: evalActions.addressedTransferAssignments()
        }
      ];
      items.forEach(item => checkMatches(item));
    };

    const checkBySegment = () => {
      if (firstAlarmAnnounced && !initialReportCompleted) {
        const items = [
          {
            addressed: size,
            phrases: options.size,
            action: evalActions.addressedSize()
          },
          {
            addressed: height,
            phrases: options.height,
            action: evalActions.addressedHeight()
          },
          {
            addressed: occupancy,
            phrases: options.occupancy,
            action: evalActions.addressedOccupancy()
          },
          {
            addressed: witnessed,
            phrases: options.witnessed,
            action: evalActions.addressedWitnessed()
          },
          {
            addressed: actions,
            phrases: options.actions,
            action: evalActions.addressedActions()
          },
          {
            addressed: needs,
            phrases: options.needs,
            action: evalActions.addressedNeeds()
          },
          {
            addressed: designation,
            phrases: options.designation,
            action: evalActions.addressedDesignation()
          }
        ];
        items.forEach(item => checkMatches(item));
      } else if (
        threeSixtyWalkthroughCompleted &&
        !threeSixtyAssessmentCompleted
      ) {
        const items = [
          {
            addressed: construction,
            phrases: options.construction,
            action: evalActions.addressedConstruction()
          },
          {
            addressed: entryEgress,
            phrases: options.entryEgress,
            action: evalActions.addressedEntryEgress()
          },
          {
            addressed: conditions,
            phrases: options.conditions,
            action: evalActions.addressedConditions()
          },
          {
            addressed: interiorPath,
            phrases: options.interiorPath,
            action: evalActions.addressedInteriorPath()
          },
          {
            addressed: survivability,
            phrases: options.survivability,
            action: evalActions.addressedSurvivability()
          },
          {
            addressed: priorities,
            phrases: options.priorities,
            action: evalActions.addressedPriorities()
          }
        ];
        items.forEach(item => checkMatches(item));
      }
    };
    if (command && firstAlarmAnnounced) {
      checkBySegment();
      checkAnytime();
    }
  }, [
    command,
    firstAlarmAnnounced,
    initialReportCompleted,
    threeSixtyWalkthroughCompleted,
    threeSixtyAssessmentCompleted,
    size,
    height,
    occupancy,
    witnessed,
    actions,
    needs,
    designation,
    construction,
    entryEgress,
    conditions,
    interiorPath,
    survivability,
    priorities,
    tacticalSizeup,
    tacticalLocate,
    tacticalIdentify,
    tacticalCool,
    tacticalExtinguish,
    tacticalRescue,
    tacticalSalvage,
    strategicRescue,
    strategicExposures,
    strategicConfinement,
    strategicExtinguishment,
    strategicOverhaul,
    strategicVentilation,
    strategicSalvage,
    incident,
    par,
    can,
    transferAssignments,
    dispatch
  ]);

  return <div></div>;
};

export default Evaluation;
