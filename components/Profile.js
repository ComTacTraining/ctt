// main tools
import { useState, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserContext } from '../components/Auth/UserContext';
// mui components
import { Grid, TextField, Checkbox } from '@material-ui/core'
import {
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core'

// custom components
import { CustomAlarm } from './CustomAlarm'
import { Contained } from 'mui/Button'
import { H3, Subtitle1, P } from 'mui/Typography'

// action
import { updateUserPreferences } from '../store/actions/user'

// styles
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: { flexGrow: 1, paddingTop: 50 },
  tipsContainer: { margin: '10px 0', display: 'flex' },
  allowTip: { padding: 0 },
  WarningLabel: { fontSize: 15 }
}))

const Profile = () => {
  const { user, isMember, isAdmin, handleUserPreferences } = useContext(UserContext);
  const dispatch = useDispatch()
  const classes = useStyles()
  const [alarmCondition, setAlarmCondition] = useState(false)
  const [editable, setEditable] = useState(false)
  const [isShowTips, setIsShowTips] = useState(false)
  const { dispatchCenter, firstOnScene, incomingCommandOfficer, alarm1, alarm2, alarm3, showTips } = useSelector(state => state.user)
  const [dispatchCenterVal, setDispatchCenterVal] = useState("");
  const [data, setData] = useState(null);
  const [savedData, setSavedData] = useState(null);
  const [warningAlarmText, setWarningAlarmText] = useState("");

  useEffect(() => {
    setIsShowTips(showTips)
    setDispatchCenterVal(dispatchCenter);
    loadOriginData();
  }, [dispatchCenter, firstOnScene, incomingCommandOfficer, alarm1, alarm2, alarm3, showTips])

  const loadOriginData = () => {
    
    let tempAlarmData = []
    let alarms = [alarm1, alarm2, alarm3]
    for(let i = 0; i<3; i ++) {
      tempAlarmData[i] = []
      alarms[i].map((item) => {
        if(item === firstOnScene) {
          tempAlarmData[i] = [...tempAlarmData[i], {screen: item}]
        } else if(item === incomingCommandOfficer){
          tempAlarmData[i] = [...tempAlarmData[i], {command: item}]
        } else {
          tempAlarmData[i] = [...tempAlarmData[i], {unit: item}]
        }
      })
    }

    setSavedData({
      dispatchCenter,
      firstOnScene,
      incomingCommandOfficer,
      showTips,
      alarms: [...tempAlarmData]
    });

    setData({
      dispatchCenter,
      firstOnScene,
      incomingCommandOfficer,
      showTips,
      alarms: [...tempAlarmData]
    });
  }
  
  // Handler Actions
  const handleEditable = () => setEditable(true)

  const handleCheckbox = (ev) => setIsShowTips(ev.target.checked)

  const handleChangeDispatchCenter = (ev) => {
    setDispatchCenterVal(ev.target.value)
    setData({ ...data, [ev.target.name]: ev.target.value })
  }

  const handleChangeData = (idx, alarmData) => {
    let newData = {...data}
    newData.alarms[idx-1] = [...alarmData]
    setData({...newData});
  }

  const handleCancel = () => {
    setEditable(false);
    setData({
      dispatchCenter: savedData.dispatchCenter, 
      firstOnScene: savedData.firstOnScene, 
      incomingCommandOfficer: savedData.incomingCommandOfficer,
      showTips: savedData.showTips, 
      alarms: [...savedData.alarms]});
    setIsShowTips(savedData.showTips)
    setDispatchCenterVal(savedData.dispatchCenter)
  }

  const handleConvertDataStyle = () => {
    let tempData = {};
    let alarms = [];
    tempData.dispatchCenter = data.dispatchCenter
    for(let i = 0; i < 3; i ++) {
      alarms[i] = data.alarms[i].map(item => Object.values(item)[0]);
    }
    
    tempData.firstOnScene = (data.alarms[0].filter((item) => item.screen))[0].screen;
    tempData.incomingCommandOfficer = (data.alarms[0].filter((item) => item.command))[0].command;
    tempData.alarm1 = alarms[0]
    tempData.alarm2 = alarms[1]
    tempData.alarm3 = alarms[2]
    tempData.showTips = isShowTips

    return tempData
  }

  const checkAlarmValidation = () => {
    if(data.alarms[1].length < 1 || data.alarms[2].length < 1) {
      setWarningAlarmText("Alarm2 and Alarm3 must have more than 1 unit");
      return false;
    }
    if((data.alarms[0].filter((item) => item.command).length === 0) || (data.alarms[0].filter((item) => item.screen).length === 0)) {
      setWarningAlarmText("Alarm1 must has FirstOnScene and Incoming Command Officer");
      return false;
    } else if (data.alarms[0].length < 3) {
      setWarningAlarmText("Alarm1 must have more than 3 units including FirstOnScene and Incoming Command Officer");
      return false;
    }
    return true; 
  }

  const handleSave = async (ev) => {
    ev.preventDefault()
    if(checkAlarmValidation()) {
      setEditable(false);
      setAlarmCondition(false);
      let newData = handleConvertDataStyle()
      dispatch(updateUserPreferences(newData));
      setSavedData({
        dispatchCenter: data.dispatchCenter, 
        firstOnScene: data.firstOnScene, 
        incomingCommandOfficer: data.incomingCommandOfficer,
        showTips: data.showTips, 
        alarms: [...data.alarms]});
      await handleUserPreferences({ 
        dispatch: newData.dispatchCenter,
        firstOnScene: newData.firstOnScene,
        alarm1: newData.alarm1.join(),
        alarm2: newData.alarm2.join(),
        alarm3: newData.alarm3.join(),
        inCommandOfficer: newData.incomingCommandOfficer,
        tips: newData.showTips.toString()
      });
    } else {
      setAlarmCondition(true);
    }
  }

  const handleClose = () => {
    setAlarmCondition(false)
  }

  return (
    <>
      <H3>Profile</H3>

      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              id='dispatchCenter'
              name='dispatchCenter'
              label='Dispatch Center'
              disabled={!editable}
              variant='outlined'
              fullWidth
              onChange={handleChangeDispatchCenter}
              value={dispatchCenterVal}
            />
          </Grid>

          {data && data.alarms.map((alarmData, idx) => (
            <CustomAlarm
              key={idx}
              alarmIdx={idx + 1}
              editable={editable}
              save={handleChangeData}
              initialData={alarmData}
            />
          ))}

          <Grid item xs={12} className={classes.tipsContainer}>
            <Subtitle1>Show Tips:</Subtitle1>
            <Checkbox
              id='showTips'
              name='showTips'
              label='Show Tips'
              variant='outlined'
              disabled={!editable}
              onChange={handleCheckbox}
              checked={isShowTips}
              className={classes.allowTip}
            />
          </Grid>

          <Dialog
            open={alarmCondition}
            fullWidth
            maxWidth='xs'
            onClose={handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>
              Warning
            </DialogTitle>
            <DialogContent>
              <Grid item xs={12}>
                <P
                  className={classes.WarningLabel}
                >
                  {warningAlarmText}
                </P>
              </Grid>
              <Grid container spacing={1} style={{ margin: '20px 0' }}>
                <Grid item xs={12}>
                  <Contained fullWidth color='primary' onClick={handleClose}>
                    Close
                  </Contained>
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>

          <Grid item container spacing={2}>
            {!editable ? (
              <Grid item>
                <Contained color='primary' onClick={handleEditable}>
                  Edit
                </Contained>
              </Grid>
            ) : (
              <>
                <Grid item>
                  <Contained color='primary' onClick={handleSave}>
                    Update
                  </Contained>
                </Grid>
                <Grid item>
                  <Contained color='primary' onClick={handleCancel}>
                    Cancel
                  </Contained>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default Profile
