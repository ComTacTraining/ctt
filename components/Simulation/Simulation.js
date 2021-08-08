import AI from '@/components/Simulation/AI/AI'
import LoadUserPreferences from '@/components/Simulation/AI/LoadUserPrefereces'
import Education from '@/components/Simulation/Education/Education'
import Evaluation from '@/components/Simulation/Evaluation/Evaluation'
import Countdown from '@/components/Simulation/Overlay/Countdown'
import Groups from '@/components/Simulation/Overlay/Groups'
import MicStatus from '@/components/Simulation/Overlay/Mic'
import Tips from '@/components/Simulation/Overlay/Tips'
import Title from '@/components/Simulation/Overlay/Title'
import ScrollingText from '@/components/Simulation/ScrollingText/ScrollingText'
import Speak from '@/components/Simulation/Speak/Speak'
import TextToSpeech from '@/components/Simulation/Speak/TextToSpeech'
import RadioSound from '@/components/Simulation/Transcribe/RadioSound'
import Speech2Text from '@/components/Simulation/Transcribe/Speech2Text'
import Backdrop from '@/components/Simulation/VideoPlayer/Backdrop'
import Permission from '@/components/Simulation/VideoPlayer/Permission'
import Screen from '@/components/Simulation/VideoPlayer/Screen'
import VideoPlayer from '@/components/Simulation/VideoPlayer/VideoPlayer'
import { resetAI } from '@/store/actions/ai'
import { resetEvaluation } from '@/store/actions/evaluation'
import { resetTips } from '@/store/actions/tips'
import AdminPanel from 'components/Simulation/AdminPanel/AdminPanel'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Simulation = () => {
  const dispatch = useDispatch()
  const { transferOfCommandCompleted, educationCompleted } = useSelector(
    (state) => state.ai
  )
  const { isDemo } = useSelector((state) => state.evolution)
  const { preferencesLoaded, showTips, permissionGranted } = useSelector(
    (state) => state.user
  )
  const [intialized, setInitialized] = React.useState(false)

  React.useEffect(() => {
    dispatch(resetAI())
    dispatch(resetTips())
    if (!isDemo) {
      dispatch(resetEvaluation())
    }
    setInitialized(true)
  }, [isDemo, dispatch])

  return (
    <>
      {intialized && <LoadUserPreferences />}
      {preferencesLoaded && (
        <AdminPanel>
          <RadioSound />
          <Speech2Text />
          <AI />
          <Speak />
          <TextToSpeech />
          {!educationCompleted && (
            <Backdrop>
              <MicStatus />
              {isDemo && <Groups />}
              {(isDemo || showTips) && <Tips />}
              <Title />
              <Countdown />
              <Screen>
                <Permission />
                <ScrollingText />
                {permissionGranted && <VideoPlayer />}
              </Screen>
            </Backdrop>
          )}
          {!isDemo && transferOfCommandCompleted && <Education />}
          {!isDemo && educationCompleted && <Evaluation />}
        </AdminPanel>
      )}
    </>
  )
}

export default Simulation
