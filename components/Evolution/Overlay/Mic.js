import { green, orange, red } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver'
import * as React from 'react'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999
  },
  backdrop: {
    backgroundColor: 'rgba(43, 51, 63, .7)',
    padding: theme.spacing(1)
  },
}))

const Mic = () => {
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
      <div className={classes.backdrop}>
        <RecordVoiceOverIcon style={{ color: commandColor }} />
      </div>
    </div>
  )
}

export default Mic
