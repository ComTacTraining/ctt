import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { options } from 'utils/tips'
import * as tipsActions from 'store/actions/tips'

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
  } = useSelector((state) => state.ai)
  const {
    initialReportSize,
    initialReportHeight,
    initialReportOccupancy,
    initialReportConditions,
    initialReportActions,
    initialReportNeeds,
    initialReportDesignation,
    threeSixtyConstruction,
    threeSixtyEntryEgress,
    threeSixtyConditions,
    threeSixtyInteriorPath,
    threeSixtySurvivability,
    threeSixtyStrategicMode,
    assignmentRescue,
    assignmentExposure,
    assignmentConfinement,
    assignmentExtinguishment,
    assignmentOverhaul,
    assignmentVentilation,
    assignmentSalvage,
    incidentWithinIncident
  } = useSelector((state) => state.tips)
  const dispatch = useDispatch()
  const [partialSectionText, setPartialSectionText] = useState('')
  const [fullSectionText, setFullSectionText] = useState([])

  const allText = (full, partial) => {
    let text = ''
    for (let i = 0; i < full.length; i++) {
      text = `${text} ${full[i]}`
    }
    return `${text} ${partial}`.toLowerCase()
  }

  useEffect(() => {
    if (isPartialCommand && partialCommand !== '') {
      setPartialSectionText(partialCommand)
    } else if (!isPartialCommand && command !== '') {
      setFullSectionText(command)
      setPartialSectionText('')
    }
  }, [isPartialCommand, partialCommand, command])

  useEffect(() => {
    if (firstAlarmAnnounced && !threeSixtyWalkthroughBegan) {
      setFullSectionText([])
      setPartialSectionText('')
    } else if (
      threeSixtyWalkthroughCompleted &&
      !threeSixtyAssessmentCompleted
    ) {
      setFullSectionText([])
      setPartialSectionText('')
    } else if (threeSixtyAssessmentCompleted && !assignmentsCompleted) {
      setFullSectionText([])
      setPartialSectionText('')
    }
  }, [
    firstAlarmAnnounced,
    threeSixtyWalkthroughBegan,
    threeSixtyWalkthroughCompleted,
    threeSixtyAssessmentCompleted,
    assignmentsCompleted
  ])

  useEffect(() => {
    if (firstAlarmAnnounced && !threeSixtyWalkthroughBegan) {
      const commands = allText(fullSectionText, partialSectionText)
      if (!initialReportSize) {
        options.initialReportSize.forEach((phrase) => {
          if (commands.includes(phrase)) {
            dispatch(tipsActions.addressedInitialReportSize())
          }
        })
      }
      if (!initialReportHeight) {
        options.initialReportHeight.forEach((phrase) => {
          if (commands.includes(phrase)) {
            dispatch(tipsActions.addressedInitialReportHeight())
          }
        })
      }
      if (!initialReportOccupancy) {
        options.initialReportOccupancy.forEach((phrase) => {
          if (commands.includes(phrase)) {
            dispatch(tipsActions.addressedInitialReportOccupancy())
          }
        })
      }
      if (!initialReportConditions) {
        options.initialReportConditions.forEach((phrase) => {
          if (commands.includes(phrase)) {
            dispatch(tipsActions.addressedInitialReportConditions())
          }
        })
      }
      if (!initialReportActions) {
        options.initialReportActions.forEach((phrase) => {
          if (commands.includes(phrase)) {
            dispatch(tipsActions.addressedInitialReportActions())
          }
        })
      }
      if (!initialReportNeeds) {
        options.initialReportNeeds.forEach((phrase) => {
          if (commands.includes(phrase)) {
            dispatch(tipsActions.addressedInitialReportNeeds())
          }
        })
      }
      if (!initialReportDesignation) {
        options.initialReportDesignation.forEach((phrase) => {
          if (commands.includes(phrase)) {
            dispatch(tipsActions.addressedInitialReportDesignation())
          }
        })
      }
    }
  }, [
    firstAlarmAnnounced,
    threeSixtyWalkthroughBegan,
    fullSectionText,
    partialSectionText,
    dispatch,
    initialReportSize,
    initialReportHeight,
    initialReportOccupancy,
    initialReportConditions,
    initialReportActions,
    initialReportNeeds,
    initialReportDesignation
  ])

  useEffect(() => {
    if (threeSixtyWalkthroughCompleted && !threeSixtyAssessmentCompleted) {
      const commands = allText(fullSectionText, partialSectionText)
      if (!threeSixtyConstruction) {
        options.threeSixtyConstruction.forEach((phrase) => {
          if (commands.includes(phrase)) {
            dispatch(tipsActions.addressedThreeSixtyConstruction())
          }
        })
      }
      if (!threeSixtyEntryEgress) {
        options.threeSixtyEntryEgress.forEach((phrase) => {
          if (commands.includes(phrase)) {
            dispatch(tipsActions.addressedThreeSixtyEntryEgress())
          }
        })
      }
      if (!threeSixtyConditions) {
        options.threeSixtyConditions.forEach((phrase) => {
          if (commands.includes(phrase)) {
            dispatch(tipsActions.addressedThreeSixtyConditions())
          }
        })
      }
      if (!threeSixtyInteriorPath) {
        options.threeSixtyInteriorPath.forEach((phrase) => {
          if (commands.includes(phrase)) {
            dispatch(tipsActions.addressedThreeSixtyInteriorPath())
          }
        })
      }
      if (!threeSixtySurvivability) {
        options.threeSixtySurvivability.forEach((phrase) => {
          if (commands.includes(phrase)) {
            dispatch(tipsActions.addressedThreeSixtySurvivability())
          }
        })
      }
      if (!threeSixtyStrategicMode) {
        options.threeSixtyStrategicMode.forEach((phrase) => {
          if (commands.includes(phrase)) {
            dispatch(tipsActions.addressedThreeSixtyStrategicMode())
          }
        })
      }
    }
  }, [
    threeSixtyWalkthroughCompleted,
    threeSixtyAssessmentCompleted,
    fullSectionText,
    partialSectionText,
    dispatch,
    threeSixtyConstruction,
    threeSixtyEntryEgress,
    threeSixtyConditions,
    threeSixtyInteriorPath,
    threeSixtySurvivability,
    threeSixtyStrategicMode
  ])

  useEffect(() => {
    if (
      threeSixtyAssessmentCompleted &&
      (!assignmentsCompleted || !faceToFaceRequested)
    ) {
      const commands = allText(fullSectionText, partialSectionText)
      if (!assignmentRescue) {
        options.assignmentRescue.forEach((phrase) => {
          if (commands.includes(phrase)) {
            dispatch(tipsActions.addressedAssignmentRescue())
          }
        })
      }
      if (!assignmentExposure) {
        options.assignmentExposure.forEach((phrase) => {
          if (commands.includes(phrase)) {
            dispatch(tipsActions.addressedAssignmentExposure())
          }
        })
      }
      if (!assignmentConfinement) {
        options.assignmentConfinement.forEach((phrase) => {
          if (commands.includes(phrase)) {
            dispatch(tipsActions.addressedAssignmentConfinement())
          }
        })
      }
      if (!assignmentExtinguishment) {
        options.assignmentExtinguishment.forEach((phrase) => {
          if (commands.includes(phrase)) {
            dispatch(tipsActions.addressedAssignmentExtinguishment())
          }
        })
      }
      if (!assignmentOverhaul) {
        options.assignmentOverhaul.forEach((phrase) => {
          if (commands.includes(phrase)) {
            dispatch(tipsActions.addressedAssignmentOverhaul())
          }
        })
      }
      if (!assignmentVentilation) {
        options.assignmentVentilation.forEach((phrase) => {
          if (commands.includes(phrase)) {
            dispatch(tipsActions.addressedAssignmentVentilation())
          }
        })
      }
      if (!assignmentSalvage) {
        options.assignmentSalvage.forEach((phrase) => {
          if (commands.includes(phrase)) {
            dispatch(tipsActions.addressedAssignmentSalvage())
          }
        })
      }
    }
  }, [
    threeSixtyAssessmentCompleted,
    assignmentsCompleted,
    faceToFaceRequested,
    fullSectionText,
    partialSectionText,
    dispatch,
    assignmentRescue,
    assignmentExposure,
    assignmentConfinement,
    assignmentExtinguishment,
    assignmentOverhaul,
    assignmentVentilation,
    assignmentSalvage
  ])

  // useEffect(() => {
  //   if (
  //     threeSixtyAssessmentCompleted &&
  //     unitsAssigned > 2 &&
  //     !incidentCompleted &&
  //     assignments !== ''
  //   ) {
  //     if (!incidentWithinIncident) {
  //       options.incidentWithinIncident.forEach((phrase) => {
  //         if (assignments.includes(phrase)) {
  //           dispatch(tipsActions.addressedIncidentWithinIncident())
  //         }
  //       })
  //     }
  //   }
  // }, [
  //   threeSixtyAssessmentCompleted,
  //   unitsAssigned,
  //   incidentCompleted,
  //   isPartialCommand,
  //   partialCommand,
  //   dispatch,
  //   incidentWithinIncident
  // ])

  return <div className='Tips'></div>
}

export default Tips
