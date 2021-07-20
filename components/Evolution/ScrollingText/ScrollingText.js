import { makeStyles } from '@material-ui/core/styles'
import useScrollingText from 'hooks/useScrollingText'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { scrollingTextCompleted } from 'store/actions/screen'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 2,
    pointerEvents: 'none'
  }
}))

const ScrollingText = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { scrollText } = useSelector(state => state.screen)
  const canvasRef = useRef()
  const done = useScrollingText(canvasRef, scrollText)

  useEffect(() => {
    if (done) {
      dispatch(scrollingTextCompleted())
    }
  }, [done, dispatch])

  return (
    <div data-testid='scrollingtext'>
      <canvas
        ref={canvasRef}
        width='1280'
        height='720'
        className={classes.root}
      />
    </div>
  )
}

export default ScrollingText
