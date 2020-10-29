import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Tip from './Tip';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    width: 'auto',
    height: 'auto',
    right: 0,
    bottom: 0,
    top: 'auto',
    left: 'auto',
    zIndex: 999,
    padding: '2rem',
    color: 'white',
    textAlign: 'left',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  }
}));

const Tips = () => {
  const classes = useStyles();
  const ai = useSelector(state => state.ai);
  const tips = useSelector(state => state.tips);

  return (
    <div className={classes.root}>
      {(ai.firstAlarmAnnounced && !ai.threeSixtyWalkthroughBegan) && (
        <div className={classes.backdrop}>
          <Typography variant="h3" gutterBottom>Initial Report Tips</Typography>
          <Divider />
          <List dense={true}>
            <Tip completed={tips.initialReportSize} key="irSize" title="Size of the building" />
            <Tip completed={tips.initialReportHeight} key="irHeight" title="Height of the building" />
            <Tip completed={tips.initialReportOccupancy} key="irOccupancy" title="Occupancy of the building" />
            <Tip completed={tips.initialReportConditions} key="irConditions" title="Witnessed conditions" />
            <Tip completed={tips.initialReportActions} key="irAction" title="Initial actions" />
            <Tip completed={tips.initialReportNeeds} key="irNeeds" title="Resource needs" />
            <Tip completed={tips.initialReportDesignation} key="irDesignation" title="Command designation" />
          </List>
        </div>
      )}
      {(ai.threeSixtyWalkthroughCompleted && !ai.threeSixtyAssessmentCompleted) && (
        <div className={classes.backdrop}>
          <Typography variant="h3" gutterBottom>360&deg; Assessment Tips</Typography>
          <Divider />
          <List dense={true}>
            <Tip completed={tips.threeSixtyConstruction} key="tsCOnstruction" title="Design & Construction features" />
            <Tip completed={tips.threeSixtyEntryEgress} key="tsEntryEgress" title="Entry & Egress points" />
            <Tip completed={tips.threeSixtyConditions} key="tsConditions" title="Conditions found" />
            <Tip completed={tips.threeSixtyInteriorPath} key="tsInteriorPath" title="Interior fire travel path" />
            <Tip completed={tips.threeSixtySurvivability} key="tsSurvivability" title="Survivability profile" />
            <Tip completed={tips.threeSixtyStrategicMode} key="tsStrategy" title="Strategic mode" />
          </List>
        </div>
      )}
      {(ai.threeSixtyAssessmentCompleted && !ai.assignmentsCompleted) && (
        <div className={classes.backdrop}>
          <Typography variant="h3" gutterBottom>Assignment Tips</Typography>
          <Divider />
          <List dense={true}>
            <Tip completed={tips.assignmentRescue} key="assignRescue" title="Rescue" />
            <Tip completed={tips.assignmentExposure} key="assignExposures" title="Exposures" />
            <Tip completed={tips.assignmentConfinement} key="assignConfinement" title="Confinement" />
            <Tip completed={tips.assignmentExtinguishment} key="assignExtinguishment" title="Extinguishment" />
            <Tip completed={tips.assignmentOverhaul} key="assignOverhaul" title="Overhaul" />
            <Tip completed={tips.assignmentVentilation} key="assignVentilation" title="Ventilation" />
            <Tip completed={tips.assignmentSalvage} key="assignSalvage" title="Salvage" />
          </List>
        </div>
      )}
      {(ai.threeSixtyAssessmentCompleted && ai.unitsAssigned > 2 && !ai.incidentCompleted) && (
        <div className={classes.backdrop}>
          <Typography variant="h3" gutterBottom>Incident Withing Incident</Typography>
          <Divider />
          <List dense={true}>
            <Tip completed={tips.incidentWithinIncident} key="incident" title="Incident Response" />
          </List>
        </div>
      )}
    </div>
  );
}
export default Tips;