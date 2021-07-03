import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as aiActions from 'store/actions/ai'
import { anyTermsMatchString, options } from 'utils/ai'

const Command = () => {
  const dispatch = useDispatch()
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
  const { initialReportTerms, threeSixtyAssessmentTerms } = options
  const [lastCommand, setLastCommand] = React.useState('')

  // handle initial report
  React.useEffect(() => {
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

    if (command !== '' && command !== lastCommand) {
      incomingCommand()
      setLastCommand(command)
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
