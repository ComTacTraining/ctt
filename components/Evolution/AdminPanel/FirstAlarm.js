import { green, orange } from '@material-ui/core/colors'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import CancelIcon from '@material-ui/icons/Cancel'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import TimerIcon from '@material-ui/icons/Timer'
import useInterval from 'hooks/useInterval'
import * as React from 'react'
import { useSelector } from 'react-redux'

const largeNumber = 9999

const FirstAlarm = () => {
  const [units, setUnits] = React.useState([])
  const [numUnits, setNumUnits] = React.useState(0)
  const [secondsInit, setSecondsInit] = React.useState(false)
  const [allArrived, setAllArrived] = React.useState(false)
  const [longestWait, setLongestWait] = React.useState(0)
  const [unitsAssigned, setUnitsAssigned] = React.useState(0)
  const [officerSeconds, setOfficerSeconds] = React.useState(largeNumber)

  const { alarm1, firstOnScene, incomingCommandOfficer } = useSelector(
    (state) => state.user
  )

  const { attack, ventilation, exposure, ric, medical } = useSelector(
    (state) => state.evolution
  )

  const {
    unitArrivals,
    unitAssignments,
    incidentCompleted,
    assignmentsCompleted,
    incomingCommandArrival
  } = useSelector((state) => state.ai)

  useInterval(
    () => {
      if (longestWait > 0) {
        setLongestWait(longestWait - 1)
      }
    },
    allArrived ? null : 1000
  )

  useInterval(
    () => {
      if (officerSeconds !== largeNumber) {
        setOfficerSeconds(officerSeconds - 1)
      }
    },
    officerSeconds > 0 ? 1000 : null
  )

  React.useEffect(() => {
    const unitNames = alarm1.filter(
      (alarm) => alarm !== firstOnScene && alarm !== incomingCommandOfficer
    )

    const units = unitNames.map((unitName) => ({
      name: unitName,
      seconds: largeNumber,
      arrived: false,
      group: '',
      needs: false
    }))
    setUnits(units)
    setNumUnits(units.length)
  }, [])

  React.useEffect(() => {
    const assignArrivals = () => {
      const currTime = Date.now()
      const newUnits = units.map((unit) => {
        const arrivingUnit = unitArrivals.find((u) => u.name === unit.name)
        if (arrivingUnit.arrival) {
          let newUnit = unit
          newUnit.seconds =
            currTime > arrivingUnit.arrival
              ? 0
              : Math.round((arrivingUnit.arrival + 2000 - currTime) / 1000)
          return newUnit
        } else {
          return unit
        }
      })
      setUnits(newUnits)
      setSecondsInit(true)
    }

    const findLongestWait = () => {
      setLongestWait(
        unitArrivals.reduce((maxWait, unit) => {
          const unitWait = Math.round((unit.arrival + 2000 - Date.now()) / 1000)
          return maxWait > unitWait ? maxWait : unitWait
        }, 0)
      )
    }

    if (numUnits > 0 && numUnits === unitArrivals.length && !secondsInit) {
      assignArrivals()
      findLongestWait()
    }
  }, [numUnits, unitArrivals, secondsInit])

  React.useEffect(() => {
    const updateArrivalTimes = () => {
      const updatedUnits = units.map((unit) =>
        unit.seconds !== largeNumber
          ? {
              ...unit,
              seconds: unit.seconds > 1 ? unit.seconds - 1 : 0,
              arrived: unit.seconds > 1 ? false : true
            }
          : unit
      )
      setUnits(updatedUnits)
    }

    if (longestWait > 0) {
      updateArrivalTimes()
    } else if (secondsInit && longestWait === 0) {
      setAllArrived(true)
    }
  }, [longestWait])

  React.useEffect(() => {
    if (incomingCommandArrival !== 0) {
      const secondsUntilArrival = Math.round(
        (incomingCommandArrival - Date.now()) / 1000
      )
      setOfficerSeconds(secondsUntilArrival)
    }
  }, [incomingCommandArrival])

  React.useEffect(() => {
    const getNeeds = (group) => {
      switch (group) {
        case 'Fire Attack':
          return attack
        case 'Ventilation':
          return ventilation
        case 'Exposure':
          return exposure
        case 'RIC':
          return ric
        case 'Medical':
          return medical
        default:
          return false
      }
    }

    if (unitAssignments.length > unitsAssigned) {
      const assignment = unitAssignments[unitsAssigned]
      setUnits(
        units.map((unit) =>
          unit.name === assignment.name
            ? {
                ...unit,
                group: assignment.group,
                needs: getNeeds(assignment.group)
              }
            : unit
        )
      )
      setUnitsAssigned(unitsAssigned + 1)
    }
  }, [unitsAssigned, unitAssignments])

  return (
    <TableContainer>
      <Table size='small' aria-label='units'>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align='right'>Arrival</TableCell>
            <TableCell align='right'>Group</TableCell>
            <TableCell align='right'>Needs</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <>
            {!assignmentsCompleted &&
              units.map((unit) => (
                <TableRow key={unit.name}>
                  <TableCell component='th' scope='row'>
                    {unit.name}
                  </TableCell>
                  <TableCell align='right'>
                    {unit.arrived ? (
                      <CheckCircleIcon style={{ color: green[600] }} />
                    ) : unit.seconds === largeNumber ? (
                      <MoreHorizIcon />
                    ) : (
                      <>
                        {unit.seconds}
                        <TimerIcon />
                      </>
                    )}
                  </TableCell>
                  <TableCell align='right'>
                    {unit.group === '' ? <MoreHorizIcon /> : unit.group}
                  </TableCell>
                  <TableCell align='right'>
                    {unit.group === '' ? (
                      <MoreHorizIcon />
                    ) : unit.needs ? (
                      <CheckCircleIcon style={{ color: orange[500] }} />
                    ) : (
                      <CancelIcon color='action' />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            {officerSeconds !== largeNumber && (
              <TableRow key='incomingCommandOfficer'>
                <TableCell component='th' scope='row'>
                  {incomingCommandOfficer}
                </TableCell>
                <TableCell align='right'>
                  {officerSeconds === 0 ? (
                    <CheckCircleIcon style={{ color: green[600] }} />
                  ) : officerSeconds === largeNumber ? (
                    <MoreHorizIcon />
                  ) : (
                    <>
                      {officerSeconds}
                      <TimerIcon />
                    </>
                  )}
                </TableCell>
                <TableCell align='right'>N/A</TableCell>
                <TableCell align='right'>N/A</TableCell>
              </TableRow>
            )}
          </>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default FirstAlarm
