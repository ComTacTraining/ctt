import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import * as React from 'react'

const useStyles = makeStyles(() => ({
  simDisplay: {
    width: '100%',
    height: '0',
    paddingBottom: '56.25%',
    backgroundColor: '#000000',
    position: 'relative'
  }
}))

const VideoDisplay = ({ children }) => {
  const classes = useStyles()

  return <div className={classes.simDisplay}>{children}</div>
}

VideoDisplay.propTypes = {
  children: PropTypes.any
}

export default VideoDisplay
