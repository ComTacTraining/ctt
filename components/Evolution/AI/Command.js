import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { options, anyTermsMatchString } from 'utils/ai'
import * as aiActions from 'store/actions/ai'

const Command = () => {
  const {
    initialReportCompleted,
    threeSixtyWalkthroughCompleted,
    threeSixtyAssessmentCompleted,
    incidentAnnounced,
    incidentCompleted,
    faceToFaceRequested,
    faceToFaceCompleted,
    command
  } = useSelector((state) => state.ai)

  const dispatch = useDispatch()

  const { initialReportTerms, threeSixtyAssessmentTerms } = options

  // handle initial report
  useEffect(() => {
    const incomingCommand = () => {
      if (!initialReportCompleted) {
        if (anyTermsMatchString(command, initialReportTerms)) {
          dispatch(aiActions.initialReportCompleted())
        }
      } else if (
        threeSixtyWalkthroughCompleted &&
        !threeSixtyAssessmentCompleted
      ) {
        if (anyTermsMatchString(command, threeSixtyAssessmentTerms)) {
          dispatch(aiActions.threeSixtyAssessmentCompleted())
        }
      } else if (incidentAnnounced && !incidentCompleted) {
        dispatch(aiActions.incidentCompleted())
      } else if (faceToFaceRequested && !faceToFaceCompleted) {
        dispatch(aiActions.faceToFaceCompleted())
      }
    }

    if (command !== '') {
      incomingCommand()
    }
  }, [
    command,
    initialReportCompleted,
    initialReportTerms,
    threeSixtyWalkthroughCompleted,
    threeSixtyAssessmentCompleted,
    threeSixtyAssessmentTerms,
    incidentAnnounced,
    incidentCompleted,
    faceToFaceRequested,
    faceToFaceCompleted,
    dispatch
  ])

  return <div />
}

export default Command
