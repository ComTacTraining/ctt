import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { H6, P, Caption } from 'mui/Typography'
import TextField from '../Transcribe/TextField'
import MicIcon from '@material-ui/icons/Mic'
import MicNoneIcon from '@material-ui/icons/MicNone'
import MicOffIcon from '@material-ui/icons/MicOff'
import { toggleUsingMic } from 'store/actions/user'

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
  const [usingMic, setUsingMic] = React.useState(false)
  const { radioInUse, partialCommand, speechBotState } = useSelector(
    (state) => state.ai
  )

  React.useEffect(() => {
    setUsingMic(true)
  }, [])

  React.useEffect(() => {
    dispatch(toggleUsingMic())
  }, [usingMic, dispatch])

  return (
    <Paper className={classes.command}>
      {usingMic ? (
        <>
          {radioInUse ? (
            <MicNoneIcon onClick={() => setUsingMic(false)} />
          ) : (
            <MicIcon onClick={() => setUsingMic(false)} />
          )}
        </>
      ) : (
        <MicOffIcon onClick={() => setUsingMic(true)} />
      )}
      <H6 align='center'>{usingMic ? 'Using Mic' : 'Using Keyboard'}</H6>
      {usingMic && <P>{speechBotState}</P>}
      {partialCommand !== '' && (
        <>
          <P>Current Command:</P>
          <Caption>{partialCommand}</Caption>
        </>
      )}
      {!usingMic && <TextField key='textfield' />}
    </Paper>
  )
}

export default Command
