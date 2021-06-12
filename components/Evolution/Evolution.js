import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Contained } from 'mui/Button'
import VideoLayout from './VideoLayout'
import Status from 'components/Evolution/Command/Status'
import AI from './AI/AI'
import ScrollingText from './ScrollingText/ScrollingText'
import Speak from './Speak/Speak'
import TextToSpeech from 'components/Evolution/Speak/TextToSpeech'
import Education from './Education/Education'
import Tips from './Tips/Tips'
import VideoPlayer from './VideoPlayer/VideoPlayer'
import AdminPanel from 'components/Evolution/AdminPanel/AdminPanel'
import Command from 'components/Evolution/AdminPanel/Command'
import Evaluation from './Evaluation/Evaluation'
import { playlistFromId } from 'utils/video'
import { startTime, resetAI } from 'store/actions/ai'
import { resetTips } from 'store/actions/tips'
import { resetEvaluation } from 'store/actions/evaluation'
import RadioSound from 'components/Evolution/Transcribe/RadioSound'
import Speech2Text from 'components/Evolution/Transcribe/Speech2Text'
import { UserContext } from 'components/Auth/UserContext'

const useStyles = makeStyles((theme) => ({
  adminButton: {
    marginBottom: theme.spacing(4),
    textAlign: 'center'
  },
  closePanel: {
    textAlign: 'center'
  }
}))

const Evolution = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { firstAlarmAnnounced, faceToFaceCompleted, educationCompleted } =
    useSelector((state) => state.ai)
  const { alias } = useSelector((state) => state.evolution)
  const { showTips } = useSelector((state) => state.user)
  const [playlist, setPlaylist] = React.useState(false)
  const [showDebug, setShowDebug] = React.useState(true)

  const { isAdmin } = React.useContext(UserContext)

  React.useEffect(() => {
    dispatch(resetAI())
    dispatch(resetTips())
    dispatch(resetEvaluation())
  }, [dispatch])

  React.useEffect(() => {
    if (alias !== '') {
      const pl = playlistFromId(alias)
      setPlaylist(pl)
      dispatch(startTime())
    }
  }, [alias, dispatch])

  const toggleShowDebug = () => {
    setShowDebug(!showDebug)
  }

  return (
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
            {!educationCompleted && (
              <VideoLayout>
                <ScrollingText />
                <Status />
                {firstAlarmAnnounced && showTips && <Tips />}
                <VideoPlayer playlist={playlist} />
              </VideoLayout>
            )}
            {faceToFaceCompleted && <Education />}
            {educationCompleted && <Evaluation />}
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

export default Evolution
