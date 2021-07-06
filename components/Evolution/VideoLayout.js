import { makeStyles } from '@material-ui/core/styles'
import * as React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    backgroundColor: '#000000',
  },
  screen: {
    margin: '0 auto',
    width: '100%',
    textAlign: 'center',
    overflow: 'hidden',
    maxWidth: '125vh',
    position: 'relative',
  },
  video: {
    width: '100%',
    position: 'relative'
  },
}))

const Video = ({ children }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.screen}>
        <div className={classes.video}>{children}</div>
      </div>
    </div>
  )
}

export default Video
