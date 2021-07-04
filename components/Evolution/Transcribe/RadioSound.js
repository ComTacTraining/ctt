import * as React from 'react'
import { useSelector } from 'react-redux'
import useSound from 'use-sound'

const RadioSound = () => {
  const { firstAlarmAnnounced, isRecordingMicrophone } = useSelector(
    (state) => state.ai
  )
  const { masterVolume } = useSelector((state) => state.user)
  const [play] = useSound('/mdc1200.mp3', { volume: masterVolume })
  const [initialized, setInitialized] = React.useState(false)
  
  React.useEffect(() => {
    if (!initialized && firstAlarmAnnounced && isRecordingMicrophone) {
      setInitialized(true)
    }
    if (initialized && firstAlarmAnnounced) {
      play()
    }
  }, [firstAlarmAnnounced, isRecordingMicrophone, initialized])

  return <div id='Radio'></div>
}

export default RadioSound
