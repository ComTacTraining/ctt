import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Switch from '@material-ui/core/Switch'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MicIcon from '@material-ui/icons/Mic'
import MicNoneIcon from '@material-ui/icons/MicNone'
import MicOffIcon from '@material-ui/icons/MicOff'
import KeyboardIcon from '@material-ui/icons/Keyboard'
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver'
import TextField from '../Transcribe/TextField'
import { toggleUsingMic } from 'store/actions/user'
import { P, Bold, Caption, Subtitle1 } from 'mui/Typography'

const useStyles = makeStyles((theme) => ({
  command: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textAlign: 'center'
  }
}))

const Command = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  // const [usingMic, setUsingMic] = React.useState(false)
  const { usingMic } = useSelector((state) => state.user)
  const [commandsAllowed, setCommandsAllowed] = React.useState(false)
  const {
    firstAlarmAnnounced,
    initialReportCompleted,
    threeSixtyWalkthroughCompleted,
    faceToFaceCompleted,
    radioInUse,
    partialCommand,
    speechBotState
  } = useSelector((state) => state.ai)

  React.useEffect(() => {
    // setUsingMic(true)
  }, [])

  React.useEffect(() => {
    if (faceToFaceCompleted) {
      setCommandsAllowed(false)
    } else if (threeSixtyWalkthroughCompleted) {
      setCommandsAllowed(true)
    } else if (initialReportCompleted) {
      setCommandsAllowed(false)
    } else if (firstAlarmAnnounced) {
      setCommandsAllowed(true)
    }
  }, [
    firstAlarmAnnounced,
    initialReportCompleted,
    threeSixtyWalkthroughCompleted,
    faceToFaceCompleted
  ])

  // React.useEffect(() => {
  //   dispatch(toggleUsingMic())
  // }, [usingMic, dispatch])
  const handleChange = (event) => {
    dispatch(toggleUsingMic())
  }
  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='command-content'
        id='command-header'>
        <Box mr={1}>
          <RecordVoiceOverIcon />
        </Box>
        <Subtitle1>Command</Subtitle1>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={1} justify='space-between'>
          <Grid item>
            <P>
              <Bold>Input Method:</Bold>
            </P>
          </Grid>
          <Grid item>
            <Grid container justify='flex-end'>
              <Grid item>
                <KeyboardIcon
                  style={{ color: !usingMic ? green[500] : 'inherit' }}
                />
              </Grid>
              <Grid item>
                <Switch
                  checked={usingMic}
                  onChange={handleChange}
                  name='usingMicSwitch'
                  inputProps={{ 'aria-label': 'Keyboard or Microphone?' }}
                />
              </Grid>
              <Grid item>
                <MicIcon style={{ color: usingMic ? green[500] : 'inherit' }} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {usingMic ? (
              commandsAllowed ? (
                radioInUse ? (
                  <>
                    <MicNoneIcon />
                    <P>Radio in use, mic unavailable</P>
                  </>
                ) : (
                  <>
                    <MicIcon />
                    <P>Mic is ready</P>
                  </>
                )
              ) : (
                <>
                  <MicOffIcon />
                  <P>Command not possible</P>
                </>
              )
            ) : (
              <TextField key='textfield' />
            )}
          </Grid>
          <Grid item xs={12}>
            {usingMic && <P>{speechBotState}</P>}
            {partialCommand !== '' && (
              <>
                <P>Current Command:</P>
                <Caption>{partialCommand}</Caption>
              </>
            )}
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}

export default Command
