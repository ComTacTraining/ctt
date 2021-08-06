import useInterval from '@/hooks/useInterval'
import { H4 } from '@/mui/Typography'
import { makeStyles } from '@material-ui/core/styles'
import * as React from 'react'
import { useSelector } from 'react-redux'

const SECONDS_TO_DISPLAY_OVERLAY = 4

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    width: 'auto',
    height: 'auto',
    bottom: '30px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -13%)',
    right: 'auto',
    zIndex: 998,
    padding: 0,
    color: 'white',
    textAlign: 'center'
  },
  backdrop: {
    backgroundColor: 'rgba(43, 51, 63, .7)',
    padding: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  }
}))

const Title = () => {
  const classes = useStyles()
  const { overlayTitle } = useSelector((store) => store.ai)
  const [title, setTitle] = React.useState('')
  const [secondsLeft, setSecondsLeft] = React.useState(0)

  useInterval(
    () => {
      if (secondsLeft > 0) {
        setSecondsLeft(secondsLeft - 1)
      }
    },
    secondsLeft ? 1000 : 0
  )

  React.useEffect(() => {
    if (overlayTitle && overlayTitle !== '' && overlayTitle !== title) {
      setSecondsLeft(SECONDS_TO_DISPLAY_OVERLAY)
      setTitle(overlayTitle)
    }
  }, [overlayTitle])

  React.useEffect(() => {
    if (title !== '' && secondsLeft === 0) {
      setTitle('')
    }
  }, [secondsLeft, title])

  return (
    <>
      {secondsLeft > 0 && (
        <div className={classes.root}>
          <div className={classes.backdrop}>
            <H4>{title}</H4>
          </div>
        </div>
      )}
    </>
  )
}

export default Title
