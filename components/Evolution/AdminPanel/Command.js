import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Box from '@material-ui/core/Box'
import { green } from '@material-ui/core/colors'
import Grid from '@material-ui/core/Grid'
import Switch from '@material-ui/core/Switch'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import KeyboardIcon from '@material-ui/icons/Keyboard'
import MicIcon from '@material-ui/icons/Mic'
import MicNoneIcon from '@material-ui/icons/MicNone'
import MicOffIcon from '@material-ui/icons/MicOff'
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver'
import { Bold, Caption, P, Subtitle1 } from 'mui/Typography'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCommandInputMethod } from 'store/actions/user'
import TextField from '../Transcribe/TextField'

const Command = () => {
  const dispatch = useDispatch()
  const [inputMethod, setInputMethod] = React.useState('Microphone')
  const [commandsAllowed, setCommandsAllowed] = React.useState(false)
  const {
    firstAlarmAnnounced,
    initialReportCompleted,
    threeSixtyWalkthroughCompleted,
    transferOfCommandCompleted
  } = useSelector((state) => state.ai)
  const { radioInUse } = useSelector((state) => state.units)
  const { partialCommand, speechBotState } = useSelector((state) => state.command)

  React.useEffect(() => {
    if (transferOfCommandCompleted) {
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
    transferOfCommandCompleted
  ])

  const handleInputMethodToggle = () => {
    const newInputMethod = inputMethod === 'Microphone' ? 'Keyboard' : 'Microphone'
    setInputMethod(newInputMethod)
    dispatch(setCommandInputMethod(newInputMethod))
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
                  style={{ color: inputMethod === 'Keyboard' ? green[500] : 'inherit' }}
                />
              </Grid>
              <Grid item>
                <Switch
                  checked={inputMethod === 'Microphone'}
                  onChange={handleInputMethodToggle}
                  name='inputMethodSwitch'
                  inputProps={{ 'aria-label': 'Keyboard or Microphone?' }}
                />
              </Grid>
              <Grid item>
                <MicIcon style={{ color: inputMethod === 'Microphone' ? green[500] : 'inherit' }} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {inputMethod === 'Microphone' ? (
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
            {inputMethod === 'Microphone' && <P>{speechBotState}</P>}
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
