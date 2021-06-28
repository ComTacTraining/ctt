import * as React from 'react'
import { useSelector } from 'react-redux'
import { Auth, API } from 'aws-amplify'
import Question from './Question'
import { createReview } from 'graphql/mutations'
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import Alert from '@material-ui/lab/Alert'
import { Contained } from 'mui/Button'

const TOTAL_SELF_EVAL_QUESTIONS = 28

export default function RadioButtonsGroup() {
  const { id } = useSelector((state) => state.evolution)
  const { log } = useSelector((state) => state.ai)
  const {
    size: rSize,
    height: rHeight,
    occupancy: rOccupancy,
    witnessed: rWitnessd,
    actions: rActions,
    needs: rNeeds,
    designation: rDesignation,
    construction: rConstruction,
    entryEgress: rEentryEgress,
    conditions: rConditions,
    interiorPath: rInteriorPath,
    survivability: rSurvivability,
    strategicMode: rStrategicMode,
    priorities: rPriorities,
    tacticalSizeup: rTacticalSizeup,
    tacticalLocate: rTacticalLocate,
    tacticalIdentify: rTacticalIdentify,
    tacticalCool: rTacticalCool,
    tacticalExtinguish: rTacticalExtinguish,
    tacticalRescue: rTacticalRescue,
    tacticalSalvage: rTacticalSalvage,
    strategicRescue: rStrategicRescue,
    strategicExposures: rStrategicExposures,
    strategicConfinement: rStrategicConfinement,
    strategicExtinguishment: rStrategicExtinguishment,
    strategicOverhaul: rStrategicOverhaul,
    strategicVentilation: rStrategicVentilation,
    strategicSalvage: rStrategicSalvage,
    incident: rIncident,
    par: rPar,
    can: rCan,
    transferAssignments: rTransferAssignments
  } = useSelector((state) => state.evaluation)

  const [initial, setInitial] = React.useState('no')
  const [size, setSize] = React.useState('no')
  const [height, setHeight] = React.useState('no')
  const [occupancy, setOccupancy] = React.useState('no')
  const [witnessed, setWitnessed] = React.useState('no')
  const [actions, setActions] = React.useState('no')
  const [resources, setResources] = React.useState('no')
  const [location, setLocation] = React.useState('no')
  const [assessment, setAssessment] = React.useState('no')
  const [construction, setConstruction] = React.useState('no')
  const [entryEgress, setEntryEgress] = React.useState('no')
  const [conditions, setConditions] = React.useState('no')
  const [different, setDifferent] = React.useState('no')
  const [interior, setInterior] = React.useState('no')
  const [survivability, setSurvivability] = React.useState('no')
  const [strategicMode, setStrategicMode] = React.useState('no')
  const [priorities, setPriorities] = React.useState('no')
  const [objectives, setObjectives] = React.useState('no')
  const [groups, setGroups] = React.useState('no')
  const [awareness, setAwareness] = React.useState('no')
  const [slicers, setSlicers] = React.useState('no')
  const [receovs, setReceovs] = React.useState('no')
  const [incident, setIncident] = React.useState('no')
  const [par, setPar] = React.useState('no')
  const [transfer, setTransfer] = React.useState('no')
  const [assignments, setAssignments] = React.useState('no')
  const [unity, setUnity] = React.useState('no')
  const [tactical, setTactical] = React.useState('no')
  const [autoScore, setAutoScore] = React.useState(0.0)
  const [saved, setSaved] = React.useState(false)

  React.useEffect(() => {
    let correct = 0
    if (rSize) correct++
    if (rHeight) correct++
    if (rOccupancy) correct++
    if (rWitnessd) correct++
    if (rActions) correct++
    if (rNeeds) correct++
    if (rDesignation) correct++
    if (rConstruction) correct++
    if (rEentryEgress) correct++
    if (rConditions) correct++
    if (rInteriorPath) correct++
    if (rSurvivability) correct++
    if (rStrategicMode) correct++
    if (rPriorities) correct++
    if (rTacticalSizeup) correct++
    if (rTacticalLocate) correct++
    if (rTacticalIdentify) correct++
    if (rTacticalCool) correct++
    if (rTacticalExtinguish) correct++
    if (rTacticalRescue) correct++
    if (rTacticalSalvage) correct++
    if (rStrategicRescue) correct++
    if (rStrategicExposures) correct++
    if (rStrategicConfinement) correct++
    if (rStrategicExtinguishment) correct++
    if (rStrategicOverhaul) correct++
    if (rStrategicVentilation) correct++
    if (rStrategicSalvage) correct++
    if (rIncident) correct++
    if (rPar) correct++
    if (rCan) correct++
    if (rTransferAssignments) correct++
    setAutoScore(((correct / eval.length) * 100).toFixed(2))
  }, [
    rSize,
    rHeight,
    rOccupancy,
    rWitnessd,
    rActions,
    rNeeds,
    rDesignation,
    rConstruction,
    rEentryEgress,
    rConditions,
    rInteriorPath,
    rSurvivability,
    rStrategicMode,
    rPriorities,
    rTacticalSizeup,
    rTacticalLocate,
    rTacticalIdentify,
    rTacticalCool,
    rTacticalExtinguish,
    rTacticalRescue,
    rTacticalSalvage,
    rStrategicRescue,
    rStrategicExposures,
    rStrategicConfinement,
    rStrategicExtinguishment,
    rStrategicOverhaul,
    rStrategicVentilation,
    rStrategicSalvage,
    rIncident,
    rPar,
    rCan,
    rTransferAssignments
  ])

  const getSelfScore = () => {
    let correct = 0
    if (initial === 'yes') correct++
    if (size === 'yes') correct++
    if (height === 'yes') correct++
    if (occupancy === 'yes') correct++
    if (witnessed === 'yes') correct++
    if (actions === 'yes') correct++
    if (resources === 'yes') correct++
    if (location === 'yes') correct++
    if (assessment === 'yes') correct++
    if (construction === 'yes') correct++
    if (entryEgress === 'yes') correct++
    if (conditions === 'yes') correct++
    if (different === 'yes') correct++
    if (interior === 'yes') correct++
    if (survivability === 'yes') correct++
    if (strategicMode === 'yes') correct++
    if (priorities === 'yes') correct++
    if (objectives === 'yes') correct++
    if (groups === 'yes') correct++
    if (awareness === 'yes') correct++
    if (slicers === 'yes') correct++
    if (receovs === 'yes') correct++
    if (incident === 'yes') correct++
    if (par === 'yes') correct++
    if (transfer === 'yes') correct++
    if (assignments === 'yes') correct++
    if (unity === 'yes') correct++
    if (tactical === 'yes') correct++
    return ((correct / TOTAL_SELF_EVAL_QUESTIONS) * 100).toFixed(2)
  }

  const save = async (e) => {
    e.preventDefault()
    const selfScore = getSelfScore()
    await Auth.currentAuthenticatedUser()
    await API.graphql({
      query: createReview,
      variables: {
        input: {
          autoScore: autoScore,
          selfScore: selfScore,
          transcript: JSON.stringify(log),
          reviewEvolutionId: id
        }
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
    })
    setSaved(true)
  }

  return (
    <div>
      {saved ? (
        <Alert severity='success'>
          The evolution is now complete. Please select a category from the menu.
        </Alert>
      ) : (
        <form onSubmit={(e) => save(e)}>
          <Question
            key='initial'
            name='intial'
            value={initial}
            onChange={(e) => setInitial(e.target.value)}
            label='Did you do an initial report on conditions?'
          />
          <Question
            key='size'
            name='size'
            value={size}
            onChange={(e) => setSize(e.target.value)}
            label='Did your initial report include the size of the building?'
          />
          <Question
            key='height'
            name='height'
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            label='Did your initial report include the height of the building?'
          />
          <Question
            key='occupancy'
            name='occupancy'
            value={occupancy}
            onChange={(e) => setOccupancy(e.target.value)}
            label='Did your initial report include the occupancy of the building?'
          />
          <Question
            key='witnessed'
            name='witnessed'
            value={witnessed}
            onChange={(e) => setWitnessed(e.target.value)}
            label='Did your initial report include witnessed conditions?'
          />
          <Question
            key='actions'
            name='actions'
            value={actions}
            onChange={(e) => setActions(e.target.value)}
            label='Did your initial report include your initial actions?'
          />
          <Question
            key='resources'
            name='resources'
            value={resources}
            onChange={(e) => setResources(e.target.value)}
            label='Did your initial report include your resource needs for this incident?'
          />
          <Question
            key='location'
            name='location'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            label='Did you establish command and give a command post location?'
          />
          <Question
            key='assessment'
            name='assessment'
            value={assessment}
            onChange={(e) => setAssessment(e.target.value)}
            label='Did you address a 360° assessment?'
          />
          <Question
            key='construction'
            name='construction'
            value={construction}
            onChange={(e) => setConstruction(e.target.value)}
            label='Did your 360° address design and construction features?'
          />
          <Question
            key='entryEgress'
            name='entryEgress'
            value={entryEgress}
            onChange={(e) => setEntryEgress(e.target.value)}
            label='Did your 360° address entry and egress points?'
          />
          <Question
            key='conditions'
            name='conditions'
            value={conditions}
            onChange={(e) => setConditions(e.target.value)}
            label='Did your 360° address conditions found?'
          />
          <Question
            key='different'
            name='different'
            value={different}
            onChange={(e) => setDifferent(e.target.value)}
            label='Were the conditions found different than you anticipated?'
          />
          <Question
            key='interior'
            name='interior'
            value={interior}
            onChange={(e) => setInterior(e.target.value)}
            label='Did your 360° address interior fire travel path? Where has, the fire been? Where is, it going?'
          />
          <Question
            key='survivability'
            name='survivability'
            value={survivability}
            onChange={(e) => setSurvivability(e.target.value)}
            label='Did your 360° address a survivability profile?'
          />
          <Question
            key='strategicMode'
            name='strategicMode'
            value={strategicMode}
            onChange={(e) => setStrategicMode(e.target.value)}
            label='Did your 360° identify your strategic mode to all personnel on the fire ground?'
          />
          <Question
            key='priorities'
            name='priorities'
            value={priorities}
            onChange={(e) => setPriorities(e.target.value)}
            label='Did your 360° redefine your incident priorities?'
          />
          <Question
            key='objectives'
            name='objectives'
            value={objectives}
            onChange={(e) => setObjectives(e.target.value)}
            label='Did you communicate your overall objectives to all personnel on the fire ground?'
          />
          <Question
            key='groups'
            name='groups'
            value={groups}
            onChange={(e) => setGroups(e.target.value)}
            label='Did you identify and name appropriate work groups maintaining a reasonable span of control?'
          />
          <Question
            key='awareness'
            name='awareness'
            value={awareness}
            onChange={(e) => setAwareness(e.target.value)}
            label='Did you maintain situational awareness?'
          />
          <Question
            key='slicers'
            name='slicers'
            extended={true}
            value={slicers}
            onChange={(e) => setSlicers(e.target.value)}
            label='Did your sequential actions include size “SLICERS”? Size up, Locate the fire, Identify and control the flow path, Cool the heated space from a safe location, Extinguish the fire, Rescue and Salvage.'
          />
          <Question
            key='receovs'
            name='receovs'
            extended={true}
            value={receovs}
            onChange={(e) => setReceovs(e.target.value)}
            label='Did your tactical objectives address: “RECEO-VS"? Rescue, Exposures, Confinement, Extinguishment, Overhaul, Ventilation and Salvage.'
          />
          <Question
            key='incident'
            name='incident'
            value={incident}
            onChange={(e) => setIncident(e.target.value)}
            label='Were you prepared for the incident within the incident with an effective command structure and resources?'
          />
          <Question
            key='par'
            name='par'
            value={par}
            onChange={(e) => setPar(e.target.value)}
            label='Did you do periodic Personnel Accountability Reports?'
          />
          <Question
            key='transfer'
            name='transfer'
            value={transfer}
            onChange={(e) => setTransfer(e.target.value)}
            label='Did you give an effective transfer of command report?'
          />
          <Question
            key='assignments'
            name='assignments'
            value={assignments}
            onChange={(e) => setAssignments(e.target.value)}
            label='Did your transfer of command report include assignments?'
          />
          <Question
            key='unity'
            name='unity'
            value={unity}
            onChange={(e) => setUnity(e.target.value)}
            label='Did your transfer of command report include unity of command?  Who was in charge and what resources were they responsible for?'
          />
          <Question
            key='tactical'
            name='tactical'
            value={tactical}
            onChange={(e) => setTactical(e.target.value)}
            label='Did your transfer of command report include tactical objectives assigned to each work group?'
          />
          <Contained type='submit'>Submit</Contained>
        </form>
      )}
    </div>
  )
}
