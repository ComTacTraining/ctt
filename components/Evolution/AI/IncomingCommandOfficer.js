import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as unitsActions from 'store/actions/units'
import { isEmptyObject, options } from 'utils/ai'

const {
  maxIncomingOfficerArrivalSeconds: maxSecs,
  incomingCommandOfficerVoice: voice
} = options

const IncomingCommandOfficer = () => {
  const dispatch = useDispatch()
  const { incomingCommandOfficer } = useSelector((state) => state.user)
  const { transferOfCommandRequested } = useSelector((state) => state.ai)
  const { command } = useSelector((state) => state.command)
  const { incidentCompleted, incomingCommandArrived } = useSelector(
    (state) => state.ai
  )
  const { waitingToBeSpoken } = useSelector((state) => state.units)
  const [speak, setSpeak] = React.useState({})
  const [lastCommand, setLastCommand] = React.useState('')

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
    incomingCommandOfficer
  ])

  React.useEffect(() => {
    if (lastCommand === '' && transferOfCommandRequested) {
      setLastCommand(command)
    }
  }, [command, lastCommand, transferOfCommandRequested])

  React.useEffect(() => {
    if (lastCommand !== '' && command !== lastCommand && transferOfCommandRequested) {
      dispatch(
        unitsActions.addToSpeechQueue({
          label: incomingCommandOfficer,
          text: 'Copy, I will assume command.',
          voice: voice,
          meta: 'INCOMING_COMMAND_RESPONSE'
        })
      )
    }
  }, [command, lastCommand, incomingCommandOfficer, transferOfCommandRequested ])

  return <div />
}

export default IncomingCommandOfficer
