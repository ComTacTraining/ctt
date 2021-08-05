import AdminPanel from '@/components/Evolution/AdminPanel/AdminPanel'
import Command from '@/components/Evolution/AdminPanel/Command'
import AI from '@/components/Evolution/AI/AI'
import Overlay from '@/components/Evolution/Overlay/Overlay'
import Speak from '@/components/Evolution/Speak/Speak'
import TextToSpeech from '@/components/Evolution/Speak/TextToSpeech'
import RadioSound from '@/components/Evolution/Transcribe/RadioSound'
import Speech2Text from '@/components/Evolution/Transcribe/Speech2Text'
import { useUser } from '@/hooks/useUser'
import { Contained } from '@/mui/Button'
import { resetAI } from '@/store/actions/ai'
import { startTime } from '@/store/actions/review'
import { resetTips } from '@/store/actions/tips'
import { playlistFromId } from '@/utils/video'
import Grid from '@material-ui/core/Grid'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'

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
  const { transferOfCommandCompleted } = useSelector((state) => state.ai)
  const { user, isAdmin } = useUser()
  const [showDebug, setShowDebug] = React.useState(isAdmin)

  const [playlist, setPlaylist] = React.useState(false)
  const [micPermission, setMicPermission] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    dispatch(resetAI())
    dispatch(resetTips())

    navigator.permissions
      .query({ name: 'microphone' })
      .then((permissionStatus) => {
        console.log(permissionStatus.state)
        if (permissionStatus.state == 'granted') {
          setMicPermission(true)
        } else {
          setMicPermission(false)
        }
      })
  }, [dispatch])

  React.useEffect(() => {
    const pl = playlistFromId('sfm23')
    setPlaylist(pl)
    dispatch(startTime())
  }, [dispatch])

  React.useEffect(() => {
    if (transferOfCommandCompleted) {
      router.push('/membership')
    }
  }, [transferOfCommandCompleted])

  const toggleShowDebug = () => {
    setShowDebug(!showDebug)
  }

  const requireMicAccess = () => {
    const permissions = navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    })
    permissions
      .then((stream) => {
        setMicPermission(true)
      })
      .catch((err) => {
        setMicPermission(false)
        console.log(`${err.name} : ${err.message}`)
        handleClickOpen()
      })
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return !user ? null : micPermission ? (
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
            <RadioSound />
            <Speech2Text />
            <AI />
            <Speak />
            <TextToSpeech />
            <Overlay playlist={playlist} isDemo={true} />
            {isAdmin && showDebug && <Command />}
          </Grid>
          {isAdmin && showDebug && (
            <Grid item xs={6}>
              <Grid container alignContent='center'>
                <Grid item xs={12}>
                  <AdminPanel isDemo={true} />
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      )}
    </>
  ) : (
    <>
      <button onClick={requireMicAccess}>Mic Permission</button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>
          {'Voice Search turned off?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            There was an error streaming your audio to Amazon Transcribe. You
            have to refersh or allow to access the microphone.
            <a
              link='details'
              onClick={handleClose}
              target='_blank'
              href='https://support.google.com/chrome/?p=ui_voice_search&amphl=en-US'>
              Details
            </a>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Demo
