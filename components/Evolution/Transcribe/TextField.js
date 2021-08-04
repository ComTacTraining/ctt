import {
  commandInProgress,
  updateCompletedTranscript,
  updatePartialTranscript
} from '@/store/actions/command'
import { addToLog } from '@/store/actions/review'
import { useRadio } from '@/store/actions/units'
import Button from '@material-ui/core/Button'
import MUITextField from '@material-ui/core/TextField'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const TextField = () => {
  const dispatch = useDispatch()
  const { firstOnScene } = useSelector((state) => state.user)
  const {
    firstAlarmAnnounced,
    initialReportCompleted,
    threeSixtyWalkthroughCompleted,
    transferOfCommandCompleted
  } = useSelector((state) => state.ai)
  const { radioInUse } = useSelector((state) => state.units)

  const [currentCommand, setCurrentCommand] = React.useState('')
  const [radioDisabled, setRadioDisabled] = React.useState(true)
  const [talkable, setTalkable] = React.useState(false)

  React.useEffect(() => {
    if (currentCommand === '') {
      if (radioInUse) {
        setRadioDisabled(true)
      } else {
        setRadioDisabled(false)
      }
    }
  }, [radioInUse, currentCommand])

  React.useEffect(() => {
    if (transferOfCommandCompleted) {
      setTalkable(false)
    } else if (threeSixtyWalkthroughCompleted) {
      setTalkable(true)
    } else if (initialReportCompleted) {
      setTalkable(false)
    } else if (firstAlarmAnnounced) {
      setTalkable(true)
    }
  }, [
    firstAlarmAnnounced,
    initialReportCompleted,
    threeSixtyWalkthroughCompleted,
    transferOfCommandCompleted
  ])

  const handlePartialCommand = (evt) => {
    if (evt.target.value !== '' && currentCommand === '') {
      dispatch(useRadio())
      dispatch(commandInProgress())
    }

    const lastChar = evt.target.value.charAt(evt.target.value.length - 1)

    if (lastChar === ' ' || lastChar === '.') {
      dispatch(updatePartialTranscript(evt.target.value))
    }
    setCurrentCommand(evt.target.value)
  }

  const handleCompletedCommand = (evt) => {
    evt.preventDefault()
    dispatch(updateCompletedTranscript(currentCommand))
    dispatch(
      addToLog({
        timestamp: Date.now(),
        label: firstOnScene,
        text: currentCommand
      })
    )
    setCurrentCommand('')
  }

  return !talkable ? null : (
    <form onSubmit={handleCompletedCommand}>
      <MUITextField
        fullWidth={true}
        id='command'
        label='Command'
        value={currentCommand}
        onChange={handlePartialCommand}
        disabled={radioDisabled}
      />
      <Button type='submit' variant='contained'>
        Submit
      </Button>
    </form>
  )
}

export default TextField
