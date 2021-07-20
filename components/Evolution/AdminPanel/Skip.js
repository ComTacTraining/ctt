import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import { Contained } from 'mui/Button'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as aiActions from 'store/actions/ai'
import * as unitsActions from 'store/actions/units'

const useStyles = makeStyles((theme) => ({
  btn: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}))

const Skip = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [hideInitialReport, setHideInitialReport] = React.useState(false)
  const [hide360, setHide360] = React.useState(false)
  const [hideAssignments, setHideAssignments] = React.useState(false)
  const [hideOfficerArrival, setHideOfficerArrival] = React.useState(false)
  const [hideFaceToFace, setHideFaceToFace] = React.useState(false)
  const [hideEducation, setHideEducation] = React.useState(false)

  const {
    threeSixtyWalkthroughBegan,
    threeSixtyAssessmentCompleted,
    assignmentsCompleted,
    faceToFaceRequested,
    faceToFaceCompleted,
    educationCompleted,
    incomingCommandArrived
  } = useSelector((state) => state.ai)

  React.useEffect(() => {
    if (threeSixtyWalkthroughBegan) {
      setHideInitialReport(true)
    }
  }, [threeSixtyWalkthroughBegan])

  React.useEffect(() => {
    if (threeSixtyAssessmentCompleted) {
      setHide360(true)
    }
  }, [threeSixtyAssessmentCompleted])

  React.useEffect(() => {
    if (assignmentsCompleted) {
      setHideAssignments(true)
    }
  }, [assignmentsCompleted])

  React.useEffect(() => {
    if (incomingCommandArrived) {
      setHideOfficerArrival(true)
    }
  }, [incomingCommandArrived])

  React.useEffect(() => {
    if (faceToFaceRequested) {
      setHideOfficerArrival(true)
      setHideAssignments(true)
    }
  }, [faceToFaceRequested])

  React.useEffect(() => {
    if (faceToFaceCompleted) {
      setHideFaceToFace(true)
    }
  }, [faceToFaceCompleted])

  React.useEffect(() => {
    if (educationCompleted) {
      setHideEducation(true)
    }
  }, [educationCompleted])

  const skipInitialReport = () => {
    dispatch(aiActions.firstAlarmAnnounced())
    dispatch(aiActions.initialReportCompleted())
    dispatch(aiActions.threeSixtyWalkthroughBegan())
  }

  const skip360Assessment = () => {
    dispatch(aiActions.threeSixtyWalkthroughCompleted())
    dispatch(aiActions.threeSixtyAssessmentCompleted())
  }

  const skipAssignments = () => {
    dispatch(unitsActions.updateUnitsAssigned(2))
    dispatch(aiActions.incidentAnnounced())
    dispatch(aiActions.incidentCompleted())
    dispatch(aiActions.assignmentsCompleted())
  }

  const skipOfficerWait = () => {
    dispatch(aiActions.incomingCommandArrived())
  }

  const skipFaceToFace = () => {
    dispatch(aiActions.faceToFaceRequested())
    dispatch(aiActions.faceToFaceCompleted())
  }
  const skipEducation = () => {
    dispatch(aiActions.educationCompleted())
  }

  return (
    <Box alignItems='flex-start'>
      {!hideInitialReport && (
        <Contained
          size='small'
          className={classes.btn}
          onClick={() => skipInitialReport()}>
          Initial Report
        </Contained>
      )}
      {hideInitialReport && !hide360 && (
        <Contained
          size='small'
          className={classes.btn}
          onClick={() => skip360Assessment()}>
          360°
        </Contained>
      )}
      {hide360 && !hideAssignments && (
        <Contained
          size='small'
          className={classes.btn}
          onClick={() => skipAssignments()}>
          Assignments
        </Contained>
      )}
      {hideAssignments && !hideOfficerArrival && (
        <Contained
          size='small'
          className={classes.btn}
          onClick={() => skipOfficerWait()}>
          Officer Arrival
        </Contained>
      )}
      {hideOfficerArrival && !hideFaceToFace && (
        <Contained
          size='small'
          className={classes.btn}
          onClick={() => skipFaceToFace()}>
          Face-to-Face
        </Contained>
      )}
      {hideFaceToFace && !hideEducation && (
        <Contained
          size='small'
          className={classes.btn}
          onClick={() => skipEducation()}>
          Education
        </Contained>
      )}
    </Box>
  )
}

export default Skip
