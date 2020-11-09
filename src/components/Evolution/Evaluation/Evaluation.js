import React, { useState } from "react";
import Question from "./Question";

export default function RadioButtonsGroup() {
  const [initial, setInitial] = useState("no");
  const [size, setSize] = useState("no");
  const [height, setHeight] = useState("no");
  const [occupancy, setOccupancy] = useState("no");
  const [witnessed, setWitnessed] = useState("no");
  const [actions, setActions] = useState("no");
  const [resources, setResources] = useState("no");
  const [location, setLocation] = useState("no");
  const [assessment, setAssessment] = useState("no");
  const [construction, setConstruction] = useState("no");
  const [entryEgress, setEntryEgress] = useState("no");
  const [conditions, setConditions] = useState("no");
  const [different, setDifferent] = useState("no");
  const [interior, setInterior] = useState("no");
  const [survivability, setSurvivability] = useState("no");
  const [priorities, setPriorities] = useState("no");
  const [objectives, setObjectives] = useState("no");
  const [groups, setGroups] = useState("no");
  const [awareness, setAwareness] = useState("no");
  const [slicers, setSlicers] = useState("no");
  const [receovs, setReceovs] = useState("no");
  const [incident, setIncident] = useState("no");
  const [par, setPar] = useState("no");
  const [transfer, setTransfer] = useState("no");
  const [assignments, setAssignments] = useState("no");
  const [unity, setUnity] = useState("no");
  const [tactical, setTactical] = useState("no");

  return (
    <div>
      <Question
        key="initial"
        name="intial"
        value={initial}
        onChange={e => setInitial(e.target.value)}
        label="Did you do an initial report on conditions?"
      />
      <Question
        key="size"
        name="size"
        value={size}
        onChange={e => setSize(e.target.value)}
        label="Did your initial report include the size of the building?"
      />
      <Question
        key="height"
        name="height"
        value={height}
        onChange={e => setHeight(e.target.value)}
        label="Did your initial report include the height of the building?"
      />
      <Question
        key="occupancy"
        name="occupancy"
        value={occupancy}
        onChange={e => setOccupancy(e.target.value)}
        label="Did your initial report include the occupancy of the building?"
      />
      <Question
        key="witnessed"
        name="witnessed"
        value={witnessed}
        onChange={e => setWitnessed(e.target.value)}
        label="Did your initial report include witnessed conditions?"
      />
      <Question
        key="actions"
        name="actions"
        value={actions}
        onChange={e => setActions(e.target.value)}
        label="Did your initial report include your initial actions?"
      />
      <Question
        key="resources"
        name="resources"
        value={resources}
        onChange={e => setResources(e.target.value)}
        label="Did your initial report include your resource needs for this incident?"
      />
      <Question
        key="location"
        name="location"
        value={location}
        onChange={e => setLocation(e.target.value)}
        label="Did you establish command and give a command post location?"
      />
      <Question
        key="assessment"
        name="assessment"
        value={assessment}
        onChange={e => setAssessment(e.target.value)}
        label="Did you address a 360° assessment?"
      />
      <Question
        key="construction"
        name="construction"
        value={construction}
        onChange={e => setConstruction(e.target.value)}
        label="Did your 360° address design and construction features?"
      />
      <Question
        key="entryEgress"
        name="entryEgress"
        value={entryEgress}
        onChange={e => setEntryEgress(e.target.value)}
        label="Did your 360° address entry and egress points?"
      />
      <Question
        key="conditions"
        name="conditions"
        value={conditions}
        onChange={e => setConditions(e.target.value)}
        label="Did your 360° address conditions found?"
      />
      <Question
        key="different"
        name="different"
        value={different}
        onChange={e => setDifferent(e.target.value)}
        label="Were the conditions found different than you anticipated?"
      />
      <Question
        key="interior"
        name="interior"
        value={interior}
        onChange={e => setInterior(e.target.value)}
        label="Did your 360° address interior fire travel path? Where has, the fire been? Where is, it going?"
      />
      <Question
        key="survivability"
        name="survivability"
        value={survivability}
        onChange={e => setSurvivability(e.target.value)}
        label="Did your 360° address a survivability profile?"
      />
      <Question
        key="priorities"
        name="priorities"
        value={priorities}
        onChange={e => setPriorities(e.target.value)}
        label="Did your 360° redefine your incident priorities?"
      />
      <Question
        key="objectives"
        name="objectives"
        value={objectives}
        onChange={e => setObjectives(e.target.value)}
        label="Did you communicate your overall objectives to all personnel on the fire ground?"
      />
      <Question
        key="groups"
        name="groups"
        value={groups}
        onChange={e => setGroups(e.target.value)}
        label="Did you identify and name appropriate work groups maintaining a reasonable span of control?"
      />
      <Question
        key="awareness"
        name="awareness"
        value={awareness}
        onChange={e => setAwareness(e.target.value)}
        label="Did you maintain situational awareness?"
      />
      <Question
        key="slicers"
        name="slicers"
        extended={true}
        value={slicers}
        onChange={e => setSlicers(e.target.value)}
        label="Did your sequential actions include size “SLICERS”? Size up, Locate the fire, Identify and control the flow path, Cool the heated space from a safe location, Extinguish the fire, Rescue and Salvage."
      />
      <Question
        key="receovs"
        name="receovs"
        extended={true}
        value={receovs}
        onChange={e => setReceovs(e.target.value)}
        label='Did your tactical objectives address: “RECEO-VS"? Rescue, Exposures, Confinement, Extinguishment, Overhaul, Ventilation and Salvage.'
      />
      <Question
        key="incident"
        name="incident"
        value={incident}
        onChange={e => setIncident(e.target.value)}
        label="Were you prepared for the incident within the incident with an effective command structure and resources?"
      />
      <Question
        key="par"
        name="par"
        value={par}
        onChange={e => setPar(e.target.value)}
        label="Did you do periodic Personnel Accountability Reports?"
      />
      <Question
        key="transfer"
        name="transfer"
        value={transfer}
        onChange={e => setTransfer(e.target.value)}
        label="Did you give an effective transfer of command report?"
      />
      <Question
        key="assignments"
        name="assignments"
        value={assignments}
        onChange={e => setAssignments(e.target.value)}
        label="Did your transfer of command report include assignments?"
      />
      <Question
        key="unity"
        name="unity"
        value={unity}
        onChange={e => setUnity(e.target.value)}
        label="Did your transfer of command report include unity of command?  Who was in charge and what resources were they responsible for?"
      />
      <Question
        key="tactical"
        name="tactical"
        value={tactical}
        onChange={e => setTactical(e.target.value)}
        label="Did your transfer of command report include tactical objectives assigned to each work group?"
      />
    </div>
  );
}
