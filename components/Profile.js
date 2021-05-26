import * as React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { UserContext } from 'components/Auth/UserContext'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import { Contained } from 'mui/Button'
import useForm from 'hooks/useForm'
import { H3, P } from 'mui/Typography'

import { updateUserPreferences } from "store/actions/user";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  editBtn: {
    maxWidth: '10rem',
    textAlign: 'center',
    alignSelf: 'center',
    marginRight: '20px',
    margin: `${theme.spacing(2)}px auto`,
  },
  updateBtn: {
    maxWidth: '10rem',
    textAlign: 'center',
    marginRight: '20px',
    margin: `${theme.spacing(2)}px auto`,
  },
  cancelBtn: {
    maxWidth: '10rem',
    textAlign: 'center',
    margin: `${theme.spacing(2)}px auto`,
  },
  Label: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  ShowTipsLabel: {
    width: '80px',
    float: 'left',
    marginTop: theme.spacing(2),
  },
}))

const Profile = props => {
  const dispatch = useDispatch();
  const [editable, setEditable] = React.useState(false)
  const classes = useStyles()
  const { user } = React.useContext(UserContext)
  const savedUserSettings = useSelector(state => state.user);
  const [isShowTips, setIsShowTips] = React.useState(savedUserSettings.showTips)

  const initialFormFields = {
    dispatchCenter: savedUserSettings.dispatchCenter,
    firstOnScene: savedUserSettings.firstOnScene,
    incomingCommandOfficer: savedUserSettings.incomingCommandOfficer,
    engine1: savedUserSettings.alarm1[0],
    engine2: savedUserSettings.alarm1[1],
    engine3: savedUserSettings.alarm1[2],
    truck1: savedUserSettings.alarm1[3],
    truck2: savedUserSettings.alarm1[4],
    battalion1: savedUserSettings.alarm1[5],
    engine21: savedUserSettings.alarm2[0],
    engine22: savedUserSettings.alarm2[1],
    engine23: savedUserSettings.alarm2[2],
    truck21: savedUserSettings.alarm2[3],
    truck22: savedUserSettings.alarm2[4],
    battalion2: savedUserSettings.alarm2[5],
    engine31: savedUserSettings.alarm3[0],
    engine32: savedUserSettings.alarm3[1],
    engine33: savedUserSettings.alarm3[2],
    truck31: savedUserSettings.alarm3[3],
    truck32: savedUserSettings.alarm3[4],
    battalion3: savedUserSettings.alarm3[5],
  }
  
  
  const { values, handleChange, updateAllValues, handleSubmit } = useForm(
    async () => {
      //if the user clicks the save button, save the user settings.
      dispatch(updateUserPreferences({
        dispatchCenter: dispatchCenter.value,
        firstOnScene: firstOnScene.value,
        incomingCommandOfficer: incomingCommandOfficer.value,
        alarm1: [engine1.value, engine2.value, engine3.value, truck1.value, truck2.value, battalion1.value],
        alarm2: [engine21.value, engine22.value, engine23.value, truck21.value, truck22.value, battalion2.value],
        alarm3: [engine31.value, engine32.value, engine33.value, truck31.value, truck32.value, battalion3.value],
        showTips: isShowTips,
      }))
      setEditable(false)
    },
    initialFormFields
  );

  // React.useEffect(() => {
  //   console.log("values ", values);
  // }, [values]);
  const handleEditable = () => {
    if(editable) {
      //if the user clicks the cancel button, it will show the prev settings.
      updateAllValues({
        dispatchCenter: savedUserSettings.dispatchCenter, 
        firstOnScene: savedUserSettings.firstOnScene,
        incomingCommandOfficer: savedUserSettings.incomingCommandOfficer,
        engine1: savedUserSettings.alarm1[0],
        engine2: savedUserSettings.alarm1[1],
        engine3: savedUserSettings.alarm1[2],
        truck1: savedUserSettings.alarm1[3],
        truck2: savedUserSettings.alarm1[4],
        battalion1: savedUserSettings.alarm1[5],
        engine21: savedUserSettings.alarm2[0],
        engine22: savedUserSettings.alarm2[1],
        engine23: savedUserSettings.alarm2[2],
        truck21: savedUserSettings.alarm2[3],
        truck22: savedUserSettings.alarm2[4],
        battalion2: savedUserSettings.alarm2[5],
        engine31: savedUserSettings.alarm3[0],
        engine32: savedUserSettings.alarm3[1],
        engine33: savedUserSettings.alarm3[2],
        truck31: savedUserSettings.alarm3[3],
        truck32: savedUserSettings.alarm3[4],
        battalion3: savedUserSettings.alarm3[5],        
      });

    }
    setEditable(prevState => !prevState);
    
  }

  const handleCheckbox = event => {
    setIsShowTips(event.target.checked);
  }
  

  return user && (
    <>
      <H3>Profile</H3>
      <P>Todo: Add custom alarms</P>
      <P>Todo: Add custom dispatch center</P>
      <P>Todo: Add tips default</P>

      <form onSubmit={handleSubmit}>
          <div className={classes.root}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField
                  id='dispatchCenter'
                  name='dispatchCenter'
                  label='Dispatch Center'
                  disabled={!editable}
                  variant='outlined'
                  fullWidth
                  onChange={handleChange}
                  value={editable ? values.dispatchCenter : savedUserSettings.dispatchCenter}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id='firstOnScene'
                  name='firstOnScene'
                  label='First On Scene'
                  disabled={!editable}
                  variant='outlined'
                  fullWidth
                  onChange={handleChange}
                  value={editable ? values.firstOnScene : savedUserSettings.firstOnScene}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id='incomingCommandOfficer'
                  name='incomingCommandOfficer'
                  label='Incoming Command Officer'
                  disabled={!editable}
                  variant='outlined'
                  fullWidth
                  onChange={handleChange}
                  value={editable ? values.incomingCommandOfficer : savedUserSettings.incomingCommandOfficer}
                />
              </Grid>

              <P className={classes.Label}>Alarm 1:</P>
              <Grid item xs={6}>
                <TextField
                  id='engine1'
                  name='engine1'
                  label='Engine 1'
                  disabled={!editable}
                  variant='outlined'
                  fullWidth
                  onChange={handleChange}
                  value={editable ? values.engine1 : savedUserSettings.alarm1[0]}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id='engine2'
                  name='engine2'
                  label='Engine 2'
                  disabled={!editable}
                  variant='outlined'
                  fullWidth
                  onChange={handleChange}
                  value={editable ? values.engine2 : savedUserSettings.alarm1[1]}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id='engine3'
                  name='engine3'
                  label='Engine 3'
                  disabled={!editable}
                  variant='outlined'
                  fullWidth
                  onChange={handleChange}
                  value={editable ? values.engine3 : savedUserSettings.alarm1[2]}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id='truck1'
                  name='truck1'
                  label='Truck 1'
                  disabled={!editable}
                  variant='outlined'
                  fullWidth
                  onChange={handleChange}
                  value={editable ? values.truck1 : savedUserSettings.alarm1[3]}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id='truck2'
                  name='truck2'
                  label='Truck 2'
                  disabled={!editable}
                  variant='outlined'
                  fullWidth
                  onChange={handleChange}
                  value={editable ? values.truck2 : savedUserSettings.alarm1[4]}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id='battalion1'
                  name='battalion1'
                  label='Battalion 1'
                  disabled={!editable}
                  variant='outlined'
                  fullWidth
                  onChange={handleChange}
                  value={editable ? values.battalion1 : savedUserSettings.alarm1[5]}
                />
              </Grid>

              <P className={classes.Label}>Alarm 2:</P>
              <Grid item xs={6}>
                <TextField
                  id='engine21'
                  name='engine21'
                  label='Engine 21'
                  disabled={!editable}
                  variant='outlined'
                  fullWidth
                  onChange={handleChange}
                  value={editable ? values.engine21 : savedUserSettings.alarm2[0]}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id='engine22'
                  name='engine22'
                  label='Engine 22'
                  disabled={!editable}
                  variant='outlined'
                  fullWidth
                  onChange={handleChange}
                  value={editable ? values.engine22 : savedUserSettings.alarm2[1]}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id='engine23'
                  name='engine23'
                  label='Engine 23'
                  disabled={!editable}
                  variant='outlined'
                  fullWidth
                  onChange={handleChange}
                  value={editable ? values.engine23 : savedUserSettings.alarm2[2]}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id='truck21'
                  name='truck21'
                  label='Truck 21'
                  disabled={!editable}
                  variant='outlined'
                  fullWidth
                  onChange={handleChange}
                  value={editable ? values.truck21 : savedUserSettings.alarm2[3]}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id='truck22'
                  name='truck22'
                  label='Truck 22'
                  disabled={!editable}
                  variant='outlined'
                  fullWidth
                  onChange={handleChange}
                  value={editable ? values.truck22 : savedUserSettings.alarm2[4]}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id='battalion2'
                  name='battalion2'
                  label='Battalion 2'
                  disabled={!editable}
                  variant='outlined'
                  fullWidth
                  onChange={handleChange}
                  value={editable ? values.battalion2 : savedUserSettings.alarm2[5]}
                />
              </Grid>

              <P className={classes.Label}>Alarm 3:</P>
              <Grid item xs={6}>
                <TextField
                  id='engine31'
                  name='engine31'
                  label='Engine 31'
                  disabled={!editable}
                  variant='outlined'
                  fullWidth
                  onChange={handleChange}
                  value={editable ? values.engine31 : savedUserSettings.alarm3[0]}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id='engine32'
                  name='engine32'
                  label='Engine 32'
                  disabled={!editable}
                  variant='outlined'
                  fullWidth
                  onChange={handleChange}
                  value={editable ? values.engine32 : savedUserSettings.alarm3[1]}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id='engine33'
                  name='engine33'
                  label='Engine 33'
                  disabled={!editable}
                  variant='outlined'
                  fullWidth
                  onChange={handleChange}
                  value={editable ? values.engine33 : savedUserSettings.alarm3[2]}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id='truck31'
                  name='truck31'
                  label='Truck 31'
                  disabled={!editable}
                  variant='outlined'
                  fullWidth
                  onChange={handleChange}
                  value={editable ? values.truck31 : savedUserSettings.alarm3[3]}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id='truck32'
                  name='truck32'
                  label='Truck 32'
                  disabled={!editable}
                  variant='outlined'
                  fullWidth
                  onChange={handleChange}
                  value={editable ? values.truck32 : savedUserSettings.alarm3[4]}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id='battalion3'
                  name='battalion3'
                  label='Battalion 3'
                  disabled={!editable}
                  variant='outlined'
                  fullWidth
                  onChange={handleChange}
                  value={editable ? values.battalion3 : savedUserSettings.alarm3[5]}
                />
              </Grid>

              <Grid item xs={12}>
                <P className={classes.ShowTipsLabel} >Show Tips:</P>
                <Checkbox
                  id='showTips'
                  name='showTips'
                  label='Show Tips'
                  disabled={!editable}
                  variant='outlined'
                  fullWidth
                  onChange={handleCheckbox}
                  checked={editable ? isShowTips : savedUserSettings.showTips}
                  style={{marginTop: '4px'}}
                />
              </Grid>

              <Grid item>
                <Contained
                  color='primary'
                  className={classes.editBtn}
                  style={{display: editable && 'none'}}
                  onClick={handleEditable}
                  >
                  Edit
                </Contained>
              </Grid>
              <Grid item>
                <Contained
                  type='submit'
                  color='primary'
                  className={classes.updateBtn}
                  style={{display: !editable && 'none'}}>
                  Update
                </Contained>
              </Grid>
              <Grid item>
                <Contained
                  color='primary'
                  className={classes.cancelBtn}
                  style={{display: !editable && 'none'}}
                  onClick={handleEditable}>
                  Cancel
                </Contained>
              </Grid>
            </Grid>
          </div>
        </form>
    </>
  )
}

export default Profile
