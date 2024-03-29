import { Contained } from '@/mui/Button'
import * as aiActions from '@/store/actions/ai'
import * as unitActions from '@/store/actions/units'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  btn: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}))

const Skip = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const {
    firstAlarmAnnounced,
    threeSixtyWalkthroughCompleted,
    threeSixtyAssessmentCompleted,
    transferOfCommandRequested,
    transferOfCommandCompleted,
    educationCompleted
  } = useSelector((state) => state.ai)
  const { assignmentResponses } = useSelector((state) => state.units)
  const { isDemo } = useSelector((state) => state.evolution)

  const skipToInitialReport = () => {
    dispatch(aiActions.skipToInitialReport())
  }

  const skipTo360Assessment = () => {
    dispatch(aiActions.skipTo360Assessment())
  }

  const skipToAssignments = () => {
    dispatch(aiActions.skipToAssignments())
  }

  const skipToIncident = () => {
    dispatch(unitActions.skipToIncident())
    dispatch(aiActions.skipToIncident())
  }

  const skipToTransferOfCommand = () => {
    dispatch(unitActions.skipToTransferOfCommand())
    dispatch(aiActions.skipToTransferOfCommand())
  }
  const skipToEducation = () => {
    dispatch(aiActions.skipToEducation())
  }

  const skipToEvaluation = () => {
    dispatch(aiActions.skipToEvaluation())
  }

  return (
    <Box alignItems='flex-start'>
      {!firstAlarmAnnounced && (
        <Contained
          size='small'
          className={classes.btn}
          onClick={() => skipToInitialReport()}>
          Initial Report
        </Contained>
      )}
      {!threeSixtyWalkthroughCompleted && (
        <Contained
          size='small'
          className={classes.btn}
          onClick={() => skipTo360Assessment()}>
          360° Assessment
        </Contained>
      )}
      {!threeSixtyAssessmentCompleted && (
        <Contained
          size='small'
          className={classes.btn}
          onClick={() => skipToAssignments()}>
          Assignments
        </Contained>
      )}
      {assignmentResponses < 3 && (
        <Contained
          size='small'
          className={classes.btn}
          onClick={() => skipToIncident()}>
          Incident Within Incident
        </Contained>
      )}
      {!transferOfCommandRequested && (
        <Contained
          size='small'
          className={classes.btn}
          onClick={() => skipToTransferOfCommand()}>
          Transfer of Command
        </Contained>
      )}
      {!isDemo && !transferOfCommandCompleted && (
        <Contained
          size='small'
          className={classes.btn}
          onClick={() => skipToEducation()}>
          Education
        </Contained>
      )}
      {!isDemo && !educationCompleted && (
        <Contained
          size='small'
          className={classes.btn}
          onClick={() => skipToEvaluation()}>
          Evaluation
        </Contained>
      )}
    </Box>
  )
}

export default Skip
