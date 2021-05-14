import * as React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  simDisplay: {
    width: '100%',
    height: '0',
    paddingBottom: '56.25%',
    backgroundColor: '#000000',
    position: 'relative'
  }
}))

const Video = ({ children }) => {
  const classes = useStyles()

  return <div className={classes.simDisplay}>{children}</div>
}

Video.propTypes = {
  children: PropTypes.any
}

export default Video
