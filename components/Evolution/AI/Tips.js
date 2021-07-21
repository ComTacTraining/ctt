import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as tipsActions from 'store/actions/tips'
import { options } from 'utils/tips'

const Tips = () => {
  const {
    firstAlarmAnnounced,
    threeSixtyWalkthroughBegan,
    threeSixtyWalkthroughCompleted,
    threeSixtyAssessmentCompleted,
    assignmentsCompleted,
    transferOfCommandRequested
  } = useSelector((state) => state.ai)
  const { unitsAssigned } = useSelector((state) => state.units)
  const { isPartialCommand, partialCommand, command } = useSelector((state) => state.command)
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
    canReport,
    parReport
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
      (!assignmentsCompleted || !transferOfCommandRequested)
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
    transferOfCommandRequested,
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

  useEffect(() => {
    if (threeSixtyAssessmentCompleted && unitsAssigned > 0 && (!assignmentsCompleted || !transferOfCommandRequested)) {
      const commands = allText(fullSectionText, partialSectionText)
      if (!canReport) {
        options.canReport.forEach((phrase) => {
          if (commands.includes(phrase)) {
            dispatch(tipsActions.addressedCanReport())
          }
        })
      }
      if (!parReport) {
        options.parReport.forEach((phrase) => {
          if (commands.includes(phrase)) {
            dispatch(tipsActions.addressedParReport())
          }
        })
      }
    }
  }, [
    threeSixtyAssessmentCompleted,
    unitsAssigned,
    assignmentsCompleted,
    transferOfCommandRequested,
    fullSectionText,
    partialSectionText,
    dispatch,
  ])

  return <div className='Tips'></div>
}

export default Tips
