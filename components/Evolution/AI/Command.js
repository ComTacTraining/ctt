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
    transferOfCommandRequested,
    transferOfCommandCompleted
  } = useSelector((state) => state.ai)
  const { command } = useSelector((state) => state.command)
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
      } else if (transferOfCommandRequested && !transferOfCommandCompleted) {
        dispatch(aiActions.transferOfCommandCompleted())
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
    transferOfCommandRequested,
    transferOfCommandCompleted,
    dispatch
  ])

  return <div />
}

export default Command
