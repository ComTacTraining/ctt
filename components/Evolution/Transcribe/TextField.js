import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import MUITextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {
  updatePartialTranscript,
  updateCompletedTranscript,
  addToLog,
  useRadio
} from 'store/actions/ai'

const TextField = () => {
  const dispatch = useDispatch()
  const { firstOnScene } = useSelector((state) => state.user)
  const {
    firstAlarmAnnounced,
    initialReportCompleted,
    threeSixtyWalkthroughCompleted,
    faceToFaceCompleted,
    radioInUse
  } = useSelector((state) => state.ai)

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
    if (faceToFaceCompleted) {
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
    faceToFaceCompleted
  ])

  const handlePartialCommand = (evt) => {
    if (evt.target.value !== '' && currentCommand === '') {
      dispatch(useRadio())
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
