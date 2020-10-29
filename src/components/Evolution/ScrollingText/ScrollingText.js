import React, {useRef, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import useScrollingText from 'hooks/useScrollingText';
import { scrollingTextCompleted } from 'store/actions/ai';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 2,
    pointerEvents: 'none'
  },
}));

const ScrollingText = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { scrollText } = useSelector(state => state.ai);
  // const { fullscreen } = useSelector(state => state.user);
  const canvasRef = useRef();
  const done = useScrollingText(canvasRef, scrollText);
  
  useEffect(() => {
    if (done) {
      dispatch(scrollingTextCompleted());
    }
  }, [done, dispatch]);


  return (
    <div data-testid='scrollingtext'>
      <canvas
        ref={canvasRef}
        width='1280'
        height='720'
        className={classes.root} />
    </div>
  )
};

export default ScrollingText;
