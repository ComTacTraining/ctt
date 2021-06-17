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
  const [commandAvailable, setCommandAvailable] = React.useState(false)
  const [commandColor, setCommandColor] = React.useState(red[500])
  const {
    firstAlarmAnnounced,
    initialReportCompleted,
    threeSixtyWalkthroughCompleted,
    faceToFaceCompleted,
    commandInProgress
  } = useSelector((state) => state.ai)

  React.useEffect(() => {
    if (faceToFaceCompleted) {
      setCommandAvailable(false)
    } else if (threeSixtyWalkthroughCompleted) {
      setCommandAvailable(true)
    } else if (initialReportCompleted) {
      setCommandAvailable(false)
    } else if (firstAlarmAnnounced) {
      setCommandAvailable(true)
    }
  }, [
    firstAlarmAnnounced,
    initialReportCompleted,
    threeSixtyWalkthroughCompleted,
    faceToFaceCompleted
  ])

  React.useEffect(() => {
    if (commandAvailable) {
      if (commandInProgress) {
        setCommandColor(green[500])
      } else {
        setCommandColor(orange[300])
      }
    } else {
      setCommandColor(red[500])
    }
  }, [commandAvailable, commandInProgress])

  return (
    <div className={classes.root}>
      <RecordVoiceOverIcon style={{ color: commandColor }} />
    </div>
  )
}

export default Status
