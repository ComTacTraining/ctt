import * as React from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import { Contained } from 'mui/Button'
import Status from 'components/Evolution/Command/Status'
import AdminPanel from 'components/Evolution/AdminPanel/AdminPanel'
import Command from 'components/Evolution/AdminPanel/Command'
import AI from 'components/Evolution/AI/AI'
import ScrollingText from 'components/Evolution/ScrollingText/ScrollingText'
import Speak from 'components/Evolution/Speak/Speak'
import TextToSpeech from 'components/Evolution/Speak/TextToSpeech'
import Tips from 'components/Evolution/Tips/Tips'
import VideoPlayer from 'components/Evolution/VideoPlayer/VideoPlayer'
import VideoLayout from 'components/Evolution/VideoLayout'
import RadioSound from 'components/Evolution/Transcribe/RadioSound'
import Speech2Text from 'components/Evolution/Transcribe/Speech2Text'
import { UserContext } from 'components/Auth/UserContext'
import { startTime, resetAI } from 'store/actions/ai'
import { resetTips } from 'store/actions/tips'
import { playlistFromId } from 'utils/video'

const useStyles = makeStyles((theme) => ({
  adminButton: {
    marginBottom: theme.spacing(4),
    textAlign: 'center'
  }
}))

const Demo = () => {
  const classes = useStyles()
  const router = useRouter()
  const dispatch = useDispatch()
  const [showDebug, setShowDebug] = React.useState(true)
  const { firstAlarmAnnounced, faceToFaceCompleted } = useSelector(
    (state) => state.ai
  )
  const { user, isAdmin } = React.useContext(UserContext)

  const [playlist, setPlaylist] = React.useState(false)

  React.useEffect(() => {
    dispatch(resetAI())
    dispatch(resetTips())
  }, [dispatch])

  React.useEffect(() => {
    const pl = playlistFromId('sfm23')
    setPlaylist(pl)
    dispatch(startTime())
  }, [dispatch])

  React.useEffect(() => {
    if (faceToFaceCompleted) {
      router.push('/subscribe')
    }
  }, [faceToFaceCompleted])

  const toggleShowDebug = () => {
    setShowDebug(!showDebug)
  }

  return !user ? null : (
    <>
      {playlist && (
        <Grid container spacing={1}>
          {isAdmin && (
            <Grid item xs={12} className={classes.adminButton}>
              <Contained onClick={toggleShowDebug}>
                {showDebug ? 'Hide' : 'Show'} Admin Panel
              </Contained>
            </Grid>
          )}
          <Grid item xs={showDebug ? 6 : 12}>
            {firstAlarmAnnounced && (
              <>
                <RadioSound />
                <Speech2Text />
              </>
            )}
            <AI />
            <Speak />
            <TextToSpeech />
            <VideoLayout>
              <ScrollingText />
              <Status />
              {firstAlarmAnnounced && <Tips />}
              <VideoPlayer playlist={playlist} />
            </VideoLayout>
            {isAdmin && showDebug && <Command />}
          </Grid>
          {isAdmin && showDebug && (
            <Grid item xs={6}>
              <Grid container alignContent='center'>
                <Grid item xs={12}>
                  <AdminPanel />
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      )}
    </>
  )
}

export default Demo
