import { makeStyles } from '@material-ui/core/styles'
import * as React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'relative'
  },
  screen: {
    margin: '0 auto',
    width: '100%',
    textAlign: 'center',
    overflow: 'hidden',
    maxWidth: '125vh',
    position: 'relative',
  },
  
}))

const Screen = ({ children }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.screen}>
        {children}
      </div>
    </div>
  )
}

export default Screen
