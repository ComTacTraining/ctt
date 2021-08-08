import * as commandActions from '@/store/actions/command'
import * as screenActions from '@/store/actions/screen'
import * as unitsActions from '@/store/actions/units'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  anyTermsMatchString,
  isEmptyObject,
  options,
  properPronouns
} from 'utils/ai'

const DispatchCenter = () => {
  const {
    firstAlarmAnnounced,
    threeSixtyWalkthroughCompleted: started360,
    threeSixtyAssessmentCompleted: finished360
  } = useSelector((state) => state.ai)
  const { command, incidentCommandName } = useSelector((state) => state.command)

  const { dispatchCenter: dispatchName, alarm1, alarm2, alarm3 } = useSelector(
    (state) => state.user
  )

  const { street } = useSelector((state) => state.evolution)

  const dispatch = useDispatch()

  const [speak, setSpeak] = useState({})
  const [request2, setRequest2] = useState(false)
  const [request3, setRequest3] = useState(false)

  const {
    dispatchCenterVoice: voice,
    dispatchCallOptions: calls,
    initialReportTerms: termsIR,
    threeSixtyAssessmentTerms: terms360,
    maxAdditionalAlarmSeconds: maxAlarm,
    secondAlarmTerms: terms2,
    thirdAlarmTerms: terms3
  } = options

  // speak
  useEffect(() => {
    const queue = () => {
      dispatch(
        unitsActions.addToSpeechQueue({
          label: dispatchName,
          text: speak.text,
          voice: voice,
          meta: speak.meta || null
        })
      )
      setSpeak({})
    }

    if (!isEmptyObject(speak)) {
      queue()
    }
  }, [speak, dispatchName, voice, dispatch])

  // first alarm
  useEffect(() => {
    const firstAlarm = () => {
      const randomIndex = Math.floor(Math.random() * calls.length)
      const call = calls[randomIndex]
      const firstAlarm = alarm1.join(', ')
      const dispatchAnnouncement = `Structure Fire, ${firstAlarm}; ${street}.`
      const statement = `${dispatchAnnouncement} Repeating, ${dispatchAnnouncement}`
      dispatch(screenActions.updateScrollingText(statement))
      setSpeak({
        text: `${statement} ${call}`,
        meta: 'FIRST_ALARM_ANNOUNCEMENT'
      })
    }

    if (!firstAlarmAnnounced) {
      firstAlarm()
    }
  }, [firstAlarmAnnounced, alarm1, street, calls, dispatch])

  // incoming command
  useEffect(() => {
    const incomingCommand = async () => {
      const alarmCheck = (num = 2) => {
        const terms = num === 3 ? terms3 : terms2
        let alarmName = 'second'
        if (anyTermsMatchString(command, terms)) {
          if (num === 3) {
            if (!request2) {
              setRequest2(true)
            } else {
              setRequest3(true)
              alarmName = 'third'
            }
          } else {
            setRequest2(true)
          }
          return `${alarmName} alarm requested.`
        }
        return null
      }

      const alarms = () => {
        let check2
        let check3
        if (!request2) {
          check2 = alarmCheck(2)
        }
        if (!request3) {
          check3 = alarmCheck(3)
        }
        if (check2 && check3) {
          return `second and third alarm requested.`
        }
        if (check2) {
          return check2
        }
        if (check3) {
          return check3
        }
        return null
      }

      const report = () => {
        if (!started360) {
          if (anyTermsMatchString(command, termsIR)) {
            return {
              acknowledgement: properPronouns(command),
              meta: 'INITIAL_REPORT_RESPONSE'
            }
          }
        } else if (started360 && !finished360) {
          if (anyTermsMatchString(command, terms360)) {
            return {
              acknowledgement: properPronouns(command),
              meta: 'THREE_SIXTY_ASSESSMENT_RESPONSE'
            }
          }
        }
        return null
      }

      const alarm = alarms()
      const greeting = `${dispatchName} copies, `
      const unknown = `${dispatchName} to ${incidentCommandName}, please repeat.`
      let acknowledgement = null
      let meta = null
      const reportResponse = report()
      if (reportResponse) {
        acknowledgement = reportResponse.acknowledgement
        meta = reportResponse.meta
      }
      let clearCommand = true

      if (acknowledgement && alarm) {
        setSpeak({
          text: `${greeting} ${acknowledgement}, ${alarm}`,
          meta: meta
        })
      } else if (acknowledgement && !alarm) {
        setSpeak({ text: `${greeting} ${acknowledgement}`, meta: meta })
      } else if (!acknowledgement && alarm) {
        setSpeak({ text: `${greeting} ${alarm}` })
      } else if (!finished360) {
        setSpeak({ text: unknown })
      } else {
        clearCommand = false
      }

      if (clearCommand) {
        dispatch(commandActions.clearCommand())
      }
    }

    if (command) {
      incomingCommand()
    }
  }, [
    command,
    started360,
    finished360,
    dispatchName,
    incidentCommandName,
    termsIR,
    terms360,
    terms2,
    terms3,
    request2,
    request3,
    dispatch
  ])

  //additional alarms ready
  useEffect(() => {
    let interval
    const minAlarm = Math.floor(maxAlarm / 3)
    let timeout = Math.floor(
      Math.random() * (maxAlarm - minAlarm + 1) + minAlarm
    )
    timeout *= 1000

    const announce = (num = 2) => {
      const alarmName = num === 3 ? 'third' : 'second'
      const unitNames = num === 3 ? alarm3.join(', ') : alarm2.join(', ')
      setSpeak({
        text: `${dispatchName} to ${incidentCommandName} your ${alarmName} alarm units are ${unitNames}.`
      })
    }

    if (request2) {
      interval = setTimeout(() => {
        announce(2)
      }, timeout)
    }
    if (request3) {
      interval = setTimeout(() => {
        announce(3)
      }, timeout)
    }
    return () => clearTimeout(interval)
  }, [
    request2,
    request3,
    alarm2,
    alarm3,
    maxAlarm,
    dispatchName,
    incidentCommandName,
    dispatch
  ])

  return <div />
}

export default DispatchCenter
