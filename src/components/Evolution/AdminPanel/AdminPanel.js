import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import AssignmentIcon from "@material-ui/icons/Assignment";
import TuneIcon from "@material-ui/icons/Tune";
import YesNoOption from "./YesNoOption";
import TextField from "../Transcribe/TextField";
import Log from "./Log";
import { groupConstToDisplay } from "utils/ai";
import TabPanel from "./TabPanel";
import { faceToFaceCompleted, educationCompleted } from "store/actions/ai";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  heading: {
    fontSize: theme.typography.pxToRem(15)
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20
  },
  details: {
    alignItems: "flex-start"
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2)
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  }
}));

const a11yProps = index => ({
  id: `simple-tab-${index}`,
  "aria-controls": `simple-tabpanel-${index}`
});

const AdminPanel = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const ai = useSelector(state => state.ai);
  const evaluation = useSelector(state => state.evaluation);
  const { incidentGroup } = useSelector(state => state.evolution);
  const [iwiGroup, setIwiGroup] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    if (incidentGroup) {
      setIwiGroup(groupConstToDisplay(incidentGroup));
    }
  }, [incidentGroup]);

  const handleTabSelection = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleEndFaceToFace = () => {
    dispatch(faceToFaceCompleted());
  };

  const handleShowEvaluation = () => {
    dispatch(educationCompleted());
  };

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={1}>
          <Grid key="col1" item xs={4}>
            <Paper className={classes.paper}>
              <Tabs
                value={selectedTab}
                onChange={handleTabSelection}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab icon={<EventAvailableIcon />} {...a11yProps(0)} />
                <Tab icon={<AssignmentIcon />} {...a11yProps(1)} />
                <Tab icon={<TuneIcon />} {...a11yProps(2)} />
              </Tabs>
              <TabPanel value={selectedTab} index={0}>
                <YesNoOption
                  key="firstAlarmAnnounced"
                  label="First Alarm Announced"
                  value={ai.firstAlarmAnnounced}
                />
                <YesNoOption
                  key="initialReportCompleted"
                  label="Initial Report Completed"
                  value={ai.initialReportCompleted}
                />
                <YesNoOption
                  key="threeSixtyWalkthroughBegan"
                  label="360&deg; Walkthrough Began"
                  value={ai.threeSixtyWalkthroughBegan}
                />
                <YesNoOption
                  key="threeSixtyWalkthroughCompleted"
                  label="360&deg; Walkthrough Completed"
                  value={ai.threeSixtyWalkthroughCompleted}
                />
                <YesNoOption
                  key="threeSixtyAssessmentCompleted"
                  label="360&deg; Assessment Completed"
                  value={ai.threeSixtyAssessmentCompleted}
                />
                <YesNoOption
                  key="assignmentsCompleted"
                  label="Assignments Completed"
                  value={ai.assignmentsCompleted}
                />
                <YesNoOption
                  key="incidentCompleted"
                  label="Incident Within Incident Completed"
                  value={ai.incidentCompleted}
                />
                <YesNoOption
                  key="incomingCommandOfficerArrived"
                  label="Incoming Command Arrived"
                  value={ai.incomingCommandOfficerArrived}
                />
                <YesNoOption
                  key="faceToFaceRequested"
                  label="Face to Face Requested"
                  value={ai.faceToFaceRequested}
                />
                <YesNoOption
                  key="faceToFaceCompleted"
                  label="Face to Face Completed"
                  value={ai.faceToFaceCompleted}
                />
                <YesNoOption
                  key="educationCompleted"
                  label="Education Completed"
                  value={ai.educationCompleted}
                />
                <YesNoOption
                  key="evaluationCompleted"
                  label="Evaluation Completed"
                  value={ai.evaluationCompleted}
                />
              </TabPanel>
              <TabPanel value={selectedTab} index={1}>
                <YesNoOption key="size" label="Size" value={evaluation.size} />
                <YesNoOption
                  key="height"
                  label="Height"
                  value={evaluation.height}
                />
                <YesNoOption
                  key="occupancy"
                  label="Occupancy"
                  value={evaluation.occupancy}
                />
                <YesNoOption
                  key="witnessed"
                  label="Witnessed Conditions"
                  value={evaluation.witnessed}
                />
                <YesNoOption
                  key="actions"
                  label="Actions"
                  value={evaluation.actions}
                />
                <YesNoOption
                  key="needs"
                  label="Needs"
                  value={evaluation.needs}
                />
                <YesNoOption
                  key="designation"
                  label="Command Designation"
                  value={evaluation.designation}
                />
                <YesNoOption
                  key="construction"
                  label="Construction"
                  value={evaluation.construction}
                />
                <YesNoOption
                  key="entryEgress"
                  label="Entry Egress"
                  value={evaluation.entryEgress}
                />
                <YesNoOption
                  key="conditions"
                  label="Conditions"
                  value={evaluation.conditions}
                />
                <YesNoOption
                  key="interiorPath"
                  label="Interior Path"
                  value={evaluation.interiorPath}
                />
                <YesNoOption
                  key="survivability"
                  label="Survivability"
                  value={evaluation.survivability}
                />
                <YesNoOption
                  key="priorities"
                  label="Priorities"
                  value={evaluation.priorities}
                />
                <YesNoOption
                  key="tacticalSizeup"
                  label="Size Up"
                  value={evaluation.tacticalSizeup}
                />
                <YesNoOption
                  key="tacticalLocate"
                  label="Locate"
                  value={evaluation.tacticalLocate}
                />
                <YesNoOption
                  key="tacticalIdentify"
                  label="Identify"
                  value={evaluation.tacticalIdentify}
                />
                <YesNoOption
                  key="tacticalCool"
                  label="Cool"
                  value={evaluation.tacticalCool}
                />
                <YesNoOption
                  key="tacticalExtinguish"
                  label="Extinguish"
                  value={evaluation.tacticalExtinguish}
                />
                <YesNoOption
                  key="tacticalRescue"
                  label="Rescue"
                  value={evaluation.tacticalRescue}
                />
                <YesNoOption
                  key="tacticalSalvage"
                  label="Salvage"
                  value={evaluation.tacticalSalvage}
                />
                <YesNoOption
                  key="strategicRescue"
                  label="Rescue"
                  value={evaluation.strategicRescue}
                />
                <YesNoOption
                  key="strategicExposures"
                  label="Exposures"
                  value={evaluation.strategicExposures}
                />
                <YesNoOption
                  key="strategicConfinement"
                  label="Confinement"
                  value={evaluation.strategicConfinement}
                />
                <YesNoOption
                  key="strategicExtinguishment"
                  label="Extinguishment"
                  value={evaluation.strategicExtinguishment}
                />
                <YesNoOption
                  key="strategicOverhaul"
                  label="Overhaul"
                  value={evaluation.strategicOverhaul}
                />
                <YesNoOption
                  key="strategicVentilation"
                  label="Ventilation"
                  value={evaluation.strategicVentilation}
                />
                <YesNoOption
                  key="strategicSalvage"
                  label="Salvage"
                  value={evaluation.strategicSalvage}
                />
                <YesNoOption
                  key="incident"
                  label="Incident Within Incident"
                  value={evaluation.incident}
                />
                <YesNoOption
                  key="par"
                  label="PAR Report"
                  value={evaluation.par}
                />
                <YesNoOption
                  key="can"
                  label="CAN Report"
                  value={evaluation.can}
                />
                <YesNoOption
                  key="transferAssignments"
                  label="Transfer of Command Assignments"
                  value={evaluation.transferAssignments}
                />
              </TabPanel>
              <TabPanel value={selectedTab} index={2}>
                <Typography key="events_title" variant="caption">
                  Incident Group: {iwiGroup}
                  <br />
                </Typography>
                <Button onClick={handleEndFaceToFace}>End Face-to-face</Button>
                <Button onClick={handleShowEvaluation}>End Education</Button>
              </TabPanel>
            </Paper>
          </Grid>
          <Grid key="col2" item xs={8}>
            <Paper className={classes.paper}>
              <Typography key="current_command" variant="caption">
                <strong>Current Command: </strong>
                {ai.isPartialCommand ? ai.partialCommand : ai.command}
                <br />
              </Typography>
              {ai.firstAlarmAnnounced && <TextField key="textfield" />}
              <Typography key="log_title_type" variant="caption">
                <strong>Log: </strong>
                <br />
              </Typography>
              <Log />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdminPanel;
