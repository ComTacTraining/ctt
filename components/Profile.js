// main tools
import { useState } from 'react'

// mui components
import {
  Grid,
  TextField,
  Checkbox,
  Button,
  FormControl,
} from '@material-ui/core'

// custom components
import { CustomAlarm } from './CustomAlarm'
import { Contained } from 'mui/Button'
import { H3, P } from 'mui/Typography'

// styles
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
  ShowTipsLabel: {
    width: '80px',
    float: 'left',
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}))

const Profile = () => {
  // Local Variables
  const classes = useStyles()
  const [editable, setEditable] = useState(false)
  const [isShowTips, setIsShowTips] = useState(false)
  const [data, setData] = useState({
    dispatchCenter: '',
    firstOnScene: '',
    incomingCommandOfficer: '',
    alarms: Array(3).fill([]),
  })

  // Handler Actions
  const handleEditable = () => setEditable(true)

  const handleCheckbox = (ev) => setIsShowTips(ev.target.checked)

  const handleChange = (ev) =>
    setData({ ...data, [ev.target.name]: ev.target.value })

  const handleCancel = () => {
    setEditable(false)
    setData({ ...data, alarms: data.alarms })
  }

  const handleSave = (ev) => {
    ev.preventDefault()

    console.log('Submit')
  }

  return (
    <>
      <H3>Profile</H3>
      <P>Todo: Add custom alarms</P>
      <P>Todo: Add custom dispatch center</P>
      <P>Todo: Add tips default</P>

      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <TextField
              id='dispatchCenter'
              name='dispatchCenter'
              label='Dispatch Center'
              disabled={!editable}
              variant='outlined'
              fullWidth
              onChange={handleChange}
              value={data.dispatchCenter}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id='firstOnScene'
              name='firstOnScene'
              label='First On Scene'
              disabled={!editable}
              variant='outlined'
              fullWidth
              onChange={handleChange}
              value={data.firstOnScene}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id='incomingCommandOfficer'
              name='incomingCommandOfficer'
              label='Incoming Command Officer'
              disabled={!editable}
              variant='outlined'
              fullWidth
              onChange={handleChange}
              value={data.incomingCommandOfficer}
            />
          </Grid>

          {data.alarms.map((alarmData, idx) => (
            <CustomAlarm
              key={idx}
              alarmIdx={idx + 1}
              editable={editable}
              save={setData}
              initialData={alarmData}
            />
          ))}

          <Grid item xs={12} style={{ paddingTop: 20 }}>
            <P className={classes.ShowTipsLabel}>Show Tips:</P>
            <Checkbox
              id='showTips'
              name='showTips'
              label='Show Tips'
              variant='outlined'
              disabled={!editable}
              onChange={handleCheckbox}
              checked={isShowTips}
              style={{ padding: 0 }}
            />
          </Grid>

          <Grid item>
            {!editable ? (
              <Contained
                color='primary'
                className={classes.editBtn}
                onClick={handleEditable}
              >
                Edit
              </Contained>
            ) : (
              <>
                <Contained
                  color='primary'
                  className={classes.updateBtn}
                  onClick={handleSave}
                >
                  Update
                </Contained>
                <Contained
                  color='primary'
                  className={classes.cancelBtn}
                  onClick={handleCancel}
                >
                  Cancel
                </Contained>
              </>
            )}
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default Profile
