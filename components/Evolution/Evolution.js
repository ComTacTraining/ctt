import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { UserContext } from 'components/Auth/UserContext'
import AdminPanel from 'components/Evolution/AdminPanel/AdminPanel'
import Command from 'components/Evolution/AdminPanel/Command'
import Overlay from 'components/Evolution/Overlay/Overlay'
import TextToSpeech from 'components/Evolution/Speak/TextToSpeech'
import RadioSound from 'components/Evolution/Transcribe/RadioSound'
import Speech2Text from 'components/Evolution/Transcribe/Speech2Text'
import LoadUserPreferences from 'components/LoadUserPrefereces'
import { Contained } from 'mui/Button'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetAI } from 'store/actions/ai'
import { resetEvaluation } from 'store/actions/evaluation'
import { startTime } from 'store/actions/review'
import { resetTips } from 'store/actions/tips'
import { playlistFromId } from 'utils/video'
import AI from './AI/AI'
import Education from './Education/Education'
import Evaluation from './Evaluation/Evaluation'
import Speak from './Speak/Speak'

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
  const { faceToFaceCompleted, educationCompleted } = useSelector(
    (state) => state.ai
  )
  const { alias } = useSelector((state) => state.evolution)
  const { showTips, preferencesLoaded } = useSelector((state) => state.user)
  const { isAdmin } = React.useContext(UserContext)
  const [intialized, setInitialized] = React.useState(false)
  const [playlist, setPlaylist] = React.useState(false)
  const [showDebug, setShowDebug] = React.useState(isAdmin)

  React.useEffect(() => {
    dispatch(resetAI())
    dispatch(resetTips())
    dispatch(resetEvaluation())
    setInitialized(true)
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
      {intialized && <LoadUserPreferences />}
      {playlist && preferencesLoaded && (
        <Grid container spacing={1}>
          {isAdmin && (
            <Grid item xs={12} className={classes.adminButton}>
              <Contained onClick={toggleShowDebug}>
                {showDebug ? 'Hide' : 'Show'} Admin Panel
              </Contained>
            </Grid>
          )}
          <Grid item xs={showDebug ? 6 : 12}>
            <RadioSound />
            <Speech2Text />
            <AI />
            <Speak />
            <TextToSpeech />
            {!educationCompleted && (
              <Overlay playlist={playlist} />
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
