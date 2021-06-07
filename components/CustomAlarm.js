// main tools
import { useState, useEffect } from 'react'

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
  AlarmContent: {
    border: 'solid',
    width: '100%',
    borderColor: '#C4C4C4',
    borderWidth: '2px',
    borderRadius: '8px',
    padding: '20px',
    margin: '20px 0',
  },
  AddContainer: {
    display: 'flex',
  },
  IncommingWarningLabel: {
    color: '#D0021B',
  },
  firstOnSceenColor: {
    backgroundColor: theme.palette.info.light,
  },
  incomingCommandColor: {
    backgroundColor: theme.palette.success.light,
  },
  normalUnitColor: {
    backgroundColor: theme.palette.secondary.light,
  },
}))

export const CustomAlarm = ({ initialData, alarmIdx, editable, save }) => {
  const [data, setData] = useState(initialData)
  const [checkWarning, setCheckWarning] = useState(false)
  const [show, setShow] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    setData(initialData)
  }, [initialData])

  
  const handleOpenModal = () => setShow(true)

  const handleDelete = (idx) => {
    setData(data.filter((item) => item !== data[idx]))
    save(alarmIdx, data.filter((item) => item !== data[idx]))
  }
  
  const handleChangeData = (data) => {
    setData(data)
    save(alarmIdx, data)
  }

  return (
    <div className={classes.AlarmContent}>
      <Grid container spacing={1}>
        <Grid className={classes.AddContainer} item xs={12}>
          <H6>Alarm {alarmIdx}:</H6>
          <Contained
            aria-label='close'
            color='primary'
            size='small'
            endIcon={<AddIcon />}
            onClick={handleOpenModal}
            style={{ display: !editable && 'none', marginLeft: 10 }}
          >
            Add
          </Contained>
        </Grid>

        <Grid item container spacing={2}>
          {data.map((data, idx) => (
            <Grid item key={idx}>
              <Chip
                label={data.value}
                className={data.label=="command" ? classes.incomingCommandColor : data.label == "screen" ? classes.firstOnSceenColor : classes.normalUnitColor}
                onDelete={!editable ? undefined : () => handleDelete(idx)}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>

      <CustomAlarmDialog
        idx={alarmIdx}
        open={show}
        data={data}
        setOpen={setShow}
        setData={handleChangeData}
      />
    </div>
  )
}
