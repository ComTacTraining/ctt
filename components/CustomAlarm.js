// main tools
import { useState } from 'react'

// components
import { Contained } from 'mui/Button'
import { P, H6 } from 'mui/Typography'
import { CustomAlarmDialog } from './CustomAlarmDialog'

// mui components
import { Grid, Chip } from '@material-ui/core'

// mui icons
import AddIcon from '@material-ui/icons/Add'

// styles
import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  Label: {
    width: '100px',
    float: 'left',
    marginTop: theme.spacing(2),
  },
  AddMoreButton: {
    marginTop: theme.spacing(1.5),
  },
  AlarmContent: {
    border: 'solid',
    width: '100%',
    borderColor: '#C4C4C4',
    borderWidth: '2px',
    borderRadius: '8px',
    padding: '10px 20px 20px',
    margin: '20px 0',
  },
  OnSceneCheckbox: {
    marginTop: -theme.spacing(1),
    float: 'left',
  },
  IncommingCheckbox: {
    marginTop: -theme.spacing(3),
    float: 'left',
  },
  IncommingLabel: {
    marginTop: -theme.spacing(2),
  },
  IncommingWarningLabel: {
    color: '#D0021B',
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  AlarmList: {
    listStyle: 'none',
  },
}))

export const CustomAlarm = ({ initialData, alarmIdx, editable, save }) => {
  const [data, setData] = useState(initialData)
  const [checkWarning, setCheckWarning] = useState(false)
  const [show, setShow] = useState(false)
  const classes = useStyles()

  const handleOpenModal = () => setShow(true)

  const handleDelete = (idx) =>
    setData(data.filter((item) => item !== data[idx]))

  return (
    <div className={classes.AlarmContent}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <H6 className={classes.Label}>Alarm {alarmIdx}:</H6>
          <Contained
            aria-label='close'
            color='primary'
            size='small'
            endIcon={<AddIcon />}
            onClick={handleOpenModal}
            style={{ display: !editable && 'none' }}
            className={classes.AddMoreButton}
          >
            Add
          </Contained>
        </Grid>

        {data.map((data, idx) => (
          <li key={idx} className={classes.AlarmList}>
            <Chip
              label={data.value}
              color={data.label.length > 0 ? 'primary' : undefined}
              onDelete={!editable ? undefined : () => handleDelete(idx)}
              className={classes.chip}
            />
          </li>
        ))}

        <Grid item xs={12}>
          <P
            className={classes.IncommingWarningLabel}
            style={{ display: !checkWarning && 'none' }}
          >
            Alarm1 should have at least one Screen, one Incomming Command and
            one custom unit.
          </P>
        </Grid>
      </Grid>

      <CustomAlarmDialog
        idx={alarmIdx}
        open={show}
        data={data}
        setOpen={setShow}
        setData={setData}
        setError={setCheckWarning}
      />
    </div>
  )
}
