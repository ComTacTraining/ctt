import * as React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver'
import { green, red, orange } from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: theme.spacing(2),
    left: theme.spacing(2),
    zIndex: 999
  }
}))

const Status = () => {
  const classes = useStyles()
  const [commandStatus, setCommandStatus] = React.useState(red[500])
  const {
    firstAlarmAnnounced,
    initialReportCompleted,
    threeSixtyWalkthroughCompleted,
    faceToFaceCompleted,
    radioInUse
  } = useSelector((state) => state.ai)

  React.useEffect(() => {
    if (faceToFaceCompleted) {
      setCommandStatus(red[500])
    } else if (threeSixtyWalkthroughCompleted) {
      setCommandStatus(orange[300])
    } else if (initialReportCompleted) {
      setCommandStatus(red[500])
    } else if (firstAlarmAnnounced) {
      setCommandStatus(orange[300])
    }
  }, [
    firstAlarmAnnounced,
    initialReportCompleted,
    threeSixtyWalkthroughCompleted,
    faceToFaceCompleted
  ])

  return (
    <div className={classes.root}>
      <RecordVoiceOverIcon style={{ color: commandStatus }} />
    </div>
  )
}

export default Status
