import Dialog from '@/components/UI/Dialog'
import { setPermissionGranted } from '@/store/actions/user'
import { makeStyles } from '@material-ui/core/styles'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'
import Image from 'next/image'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useStyles = makeStyles(() => ({
  mic: {
    position: 'relative',
    zIndex: 1
  },
  poster: {
    position: 'relative',
    zIndex: 3
  },
  playLink: {
    cursor: 'pointer',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 4
  },
  playIcon: {
    fontSize: 100,
    color: '#fff'
  }
}))

const Permission = ({ children }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { permissionGranted } = useSelector((state) => state.user)
  const [showDialog, setShowDialog] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    navigator.permissions
      .query({ name: 'microphone' })
      .then((permissionStatus) => {
        if (permissionStatus.state === 'granted') {
          dispatch(setPermissionGranted())
        } else {
          setIsLoading(false)
        }
      })
  }, [])

  const requireMicAccess = () => {
    const permissions = navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    })
    permissions
      .then((stream) => {
        dispatch(setPermissionGranted())
        stream.getTracks().forEach((track) => track.stop())
      })
      .catch((_err) => {
        setShowDialog(true)
      })
  }

  return permissionGranted ? null : (
    <div className={classes.mic}>
      {!isLoading && (
        <>
          <Image
            src='/poster.png'
            width='1920'
            height='1080'
            className={classes.poster}
          />
          <a onClick={requireMicAccess} className={classes.playLink}>
            <PlayCircleFilledIcon className={classes.playIcon} />
          </a>
        </>
      )}
      {showDialog && (
        <Dialog
          title='Microphone'
          text='Please try again and click the "Allow" button to enable commands.'
        />
      )}
    </div>
  )
}
export default Permission
