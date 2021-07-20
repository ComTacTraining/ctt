import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as unitsActions from 'store/actions/units'
import { isEmptyObject, options, properPronouns } from 'utils/ai'

const {
  maxIncomingOfficerArrivalSeconds: maxSecs,
  incomingCommandOfficerVoice: voice
} = options

const IncomingCommandOfficer = () => {
  const dispatch = useDispatch()
  const {
    firstOnScene,
    incomingCommandOfficer,
    faceToFaceRequested,
    faceToFaceCompleted,
    command
  } = useSelector((state) => state.user)
  const { incidentCompleted, incomingCommandArrived } = useSelector(
    (state) => state.ai
  )
  const { waitingToBeSpoken } = useSelector((state) => state.units)
  const [speak, setSpeak] = React.useState({})

  React.useEffect(() => {
    const queue = () => {
      dispatch(
        unitsActions.addToSpeechQueue({
          label: incomingCommandOfficer,
          text: speak.text,
          voice: voice,
          meta: speak.meta || null
        })
      )
      setSpeak({})
    }

    if (!isEmptyObject(speak) && waitingToBeSpoken.length === 0) {
      queue()
    } else if (!isEmptyObject(speak) && waitingToBeSpoken.length > 0) {
      dispatch(unitsActions.clearSpeechQueue())
    }
  }, [speak, incomingCommandOfficer, waitingToBeSpoken, dispatch])

  React.useEffect(() => {
    let interval

    const announceArrival = () => {
      const minArrivalSeconds = Math.floor(maxSecs / 3)
      const timeout = incomingCommandArrived
        ? 100
        : Math.floor(
            Math.random() * (maxSecs - minArrivalSeconds + 1) +
              minArrivalSeconds
          ) * 1000
      dispatch(unitsActions.addIncomingCommandArrival(Date.now() + timeout))
      interval = setTimeout(() => {
        setSpeak({
          text: `Give me a transfer of command report.`,
          meta: 'INCOMING_COMMAND_ARRIVED'
        })
      }, timeout)
    }

    if (incidentCompleted || incomingCommandArrived) {
      announceArrival()
    }

    return () => {
      if (interval) {
        clearTimeout(interval)
      }
    }
  }, [
    incidentCompleted,
    incomingCommandArrived,
    firstOnScene,
    incomingCommandOfficer
  ])

  React.useEffect(() => {
    const response = () => {
      const reply = properPronouns(command)
      setSpeak({
        text: reply,
        meta: 'INCOMING_COMMAND_RESPONSE'
      })
    }

    if (command !== '' && faceToFaceRequested && !faceToFaceCompleted) {
      response()
    }
  }, [command, faceToFaceRequested, faceToFaceCompleted])

  return <div />
}

export default IncomingCommandOfficer
