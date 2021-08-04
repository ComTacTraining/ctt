import useInterval from '@/hooks/useInterval'
import { makeStyles } from '@material-ui/core/styles'
import TimerIcon from '@material-ui/icons/Timer'
import * as React from 'react'
import { useSelector } from 'react-redux'

const LARGE_NUMBER_OF_SECONDS = 9999999999999

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    width: 'auto',
    height: 'auto',
    bottom: '30px',
    top: 'auto',
    left: '50%',
    transform: 'translate(-50%, 0)',
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
  },
  item: {
    padding: 0
  },
  icon: {
    color: 'white',
    fontSize: 'small',
    marginLeft: theme.spacing(1)
  }
}))

const Countdown = () => {
  const classes = useStyles()
  const { unitArrivals, incomingCommandArrival } = useSelector(
    (store) => store.units
  )
  const [arrivals, setArrivals] = React.useState([])
  const [nextArrivalTimestamp, setNextArrivalTimestamp] = React.useState(0)
  const [seconds, setSeconds] = React.useState(0)

  useInterval(
    () => {
      if (seconds > 0) {
        setSeconds(seconds - 1)
      }
    },
    seconds ? 1000 : 0
  )

  React.useEffect(() => {
    if (unitArrivals.length > 0) {
      const currTime = Date.now()
      let arriving = []
      unitArrivals.forEach((unit) => {
        if (unit.arrival > currTime) {
          arriving.push(unit.arrival)
        }
      })
      arriving.sort()
      setArrivals(arriving)
    }
  }, [unitArrivals])

  React.useEffect(() => {
    if (seconds === 0 && arrivals.length > 0) {
      const newArrivals = arrivals.map((arrival) => arrival > Date.now())
      if (arrivals.length !== newArrivals.length) {
        setArrivals(newArrivals)
      }
    }
  }, [seconds, arrivals])

  React.useEffect(() => {
    const findNextArrival = () => {
      let lowest = LARGE_NUMBER_OF_SECONDS
      arrivals.forEach((timestamp) => {
        if (timestamp > nextArrivalTimestamp) {
          if (timestamp < lowest) {
            lowest = timestamp
          }
        }
      })
      if (lowest === LARGE_NUMBER_OF_SECONDS && incomingCommandArrival) {
        setNextArrivalTimestamp(incomingCommandArrival)
        setSeconds(
          Math.floor((incomingCommandArrival + 2000 - Date.now()) / 1000)
        )
      } else if (lowest !== LARGE_NUMBER_OF_SECONDS) {
        setNextArrivalTimestamp(lowest)
        setSeconds(Math.floor((lowest + 2000 - Date.now()) / 1000))
      }
    }

    if (seconds === 0 && arrivals.length > 0) {
      findNextArrival()
    }
  }, [seconds, arrivals, nextArrivalTimestamp, incomingCommandArrival])

  return (
    <>
      {seconds > 0 && (
        <div className={classes.root}>
          <div className={classes.backdrop}>
            Next Arrival {seconds}s<TimerIcon className={classes.icon} />
          </div>
        </div>
      )}
    </>
  )
}

export default Countdown
