import Tip from '@/components/Simulation/Overlay/Tip'
import { H6 } from '@/mui/Typography'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    width: 'auto',
    height: 'auto',
    right: 0,
    bottom: '30px',
    top: 'auto',
    left: 'auto',
    zIndex: 999,
    padding: 0,
    color: 'white',
    textAlign: 'left'
  },
  backdrop: {
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundColor: 'rgba(43, 51, 63, .7)',
    padding: theme.spacing(1)
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0
  }
}))

const Tips = () => {
  const classes = useStyles()
  const ai = useSelector((state) => state.ai)
  const units = useSelector((state) => state.units)
  const tips = useSelector((state) => state.tips)

  return (
    <div className={classes.root}>
      {ai.firstAlarmAnnounced && !ai.threeSixtyWalkthroughBegan && (
        <div className={classes.backdrop}>
          <H6>Initial Report Tips</H6>
          <Divider />
          <List dense={true} className={classes.list}>
            <Tip
              completed={tips.initialReportSize}
              key='irSize'
              title='Size of the building'
            />
            <Tip
              completed={tips.initialReportHeight}
              key='irHeight'
              title='Height of the building'
            />
            <Tip
              completed={tips.initialReportOccupancy}
              key='irOccupancy'
              title='Occupancy of the building'
            />
            <Tip
              completed={tips.initialReportConditions}
              key='irConditions'
              title='Witnessed conditions'
            />
            <Tip
              completed={tips.initialReportActions}
              key='irAction'
              title='Initial actions'
            />
            <Tip
              completed={tips.initialReportNeeds}
              key='irNeeds'
              title='Resource needs'
            />
            <Tip
              completed={tips.initialReportDesignation}
              key='irDesignation'
              title='Command designation'
            />
          </List>
        </div>
      )}
      {ai.threeSixtyWalkthroughCompleted && !ai.threeSixtyAssessmentCompleted && (
        <div className={classes.backdrop}>
          <H6>360&deg; Assessment Tips</H6>
          <Divider />
          <List dense={true} className={classes.list}>
            <Tip
              completed={tips.threeSixtyConstruction}
              key='tsConstruction'
              title='Design & Construction features'
            />
            <Tip
              completed={tips.threeSixtyEntryEgress}
              key='tsEntryEgress'
              title='Entry & Egress points'
            />
            <Tip
              completed={tips.threeSixtyConditions}
              key='tsConditions'
              title='Conditions found'
            />
            <Tip
              completed={tips.threeSixtyInteriorPath}
              key='tsInteriorPath'
              title='Interior fire travel path'
            />
            <Tip
              completed={tips.threeSixtySurvivability}
              key='tsSurvivability'
              title='Survivability profile'
            />
            <Tip
              completed={tips.threeSixtyStrategicMode}
              key='tsStrategy'
              title='Strategic mode'
            />
          </List>
        </div>
      )}
      {ai.threeSixtyAssessmentCompleted && !ai.transferOfCommandCompleted && (
        <div className={classes.backdrop}>
          <H6>Assignment Tips</H6>
          <Divider />
          <List dense={true} className={classes.list}>
            <Tip
              completed={tips.assignmentRescue}
              key='assignRescue'
              title='Rescue'
            />
            <Tip
              completed={tips.assignmentExposure}
              key='assignExposures'
              title='Exposures'
            />
            <Tip
              completed={tips.assignmentConfinement}
              key='assignConfinement'
              title='Confinement'
            />
            <Tip
              completed={tips.assignmentExtinguishment}
              key='assignExtinguishment'
              title='Extinguishment'
            />
            <Tip
              completed={tips.assignmentOverhaul}
              key='assignOverhaul'
              title='Overhaul'
            />
            <Tip
              completed={tips.assignmentVentilation}
              key='assignVentilation'
              title='Ventilation'
            />
            <Tip
              completed={tips.assignmentSalvage}
              key='assignSalvage'
              title='Salvage'
            />
            {units.unitsAssigned > 0 && (
              <>
                <Tip
                  completed={tips.canReport}
                  key='canReport'
                  title='CAN Report'
                />
                <Tip
                  completed={tips.parReport}
                  key='parReport'
                  title='PAR Report'
                />
              </>
            )}
            {ai.threeSixtyAssessmentCompleted &&
              units.assignmentResponses > 2 && (
                <Tip
                  completed={ai.incidentCompleted}
                  key='incident'
                  title='Incident Within Incident Response'
                />
              )}
          </List>
        </div>
      )}
    </div>
  )
}
export default Tips
