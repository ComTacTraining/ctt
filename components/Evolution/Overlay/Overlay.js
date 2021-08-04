import Countdown from '@/components/Evolution/Overlay/Countdown'
import Groups from '@/components/Evolution/Overlay/Groups'
import Mic from '@/components/Evolution/Overlay/Mic'
import Tips from '@/components/Evolution/Overlay/Tips'
import Title from '@/components/Evolution/Overlay/Title'
import ScrollingText from '@/components/Evolution/ScrollingText/ScrollingText'
import Backdrop from '@/components/Evolution/VideoPlayer/Backdrop'
import Screen from '@/components/Evolution/VideoPlayer/Screen'
import VideoPlayer from '@/components/Evolution/VideoPlayer/VideoPlayer'
import * as React from 'react'
import { useSelector } from 'react-redux'

const Overlay = ({ playlist, isDemo = false }) => {
  const { showTips } = useSelector((state) => state.user)
  return (
    <Backdrop>
      <Mic />
      {isDemo && <Groups />}
      {(isDemo || showTips) && <Tips />}
      <Title />
      <Countdown />
      <Screen>
        <ScrollingText />
        <VideoPlayer playlist={playlist} />
      </Screen>
    </Backdrop>
  )
}

export default Overlay
