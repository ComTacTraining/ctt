import * as React from 'react'
import { useSelector } from 'react-redux'
import useSound from 'use-sound'

const RadioSound = () => {
  const { isRecordingMicrophone } = useSelector((state) => state.ai)
  const { masterVolume } = useSelector((state) => state.user)
  const [play] = useSound('/mdc1200.mp3', { volume: masterVolume })
  React.useEffect(() => {
    play()
  }, [isRecordingMicrophone])

  return <div id='Radio'></div>
}

export default RadioSound
