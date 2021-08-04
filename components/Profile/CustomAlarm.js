import { CustomAlarmDialog } from '@/components/Profile/CustomAlarmDialog'
import { Contained } from '@/mui/Button'
import { H6 } from '@/mui/Typography'
import { Chip, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import { useEffect, useState } from 'react'

export const useStyles = makeStyles((theme) => ({
  AlarmContent: {
    border: 'solid',
    width: '100%',
    borderColor: '#C4C4C4',
    borderWidth: '2px',
    borderRadius: '8px',
    padding: '20px',
    margin: '20px 0'
  },
  AddContainer: {
    display: 'flex'
  },
  IncommingWarningLabel: {
    color: '#D0021B'
  },
  firstOnSceenColor: {
    backgroundColor: theme.palette.info.light
  },
  incomingCommandColor: {
    backgroundColor: theme.palette.success.light
  },
  normalUnitColor: {
    backgroundColor: theme.palette.secondary.light
  }
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
    save(
      alarmIdx,
      data.filter((item) => item !== data[idx])
    )
  }

  const handleChangeData = (data) => {
    setData(data)
    save(alarmIdx, data)
  }

  return (
    <div className={classes.AlarmContent}>
      <Grid container spacing={1}>
        <Grid className={classes.AddContainer} item xs={12}>
          <H6>
            {alarmIdx === 1 ? 'First' : alarmIdx === 2 ? 'Second' : 'Third'}{' '}
            Alarm:
          </H6>
          <Contained
            aria-label='close'
            color='primary'
            size='small'
            endIcon={<AddIcon />}
            onClick={handleOpenModal}
            style={{ display: !editable && 'none', marginLeft: 10 }}>
            Add
          </Contained>
        </Grid>

        <Grid item container spacing={2}>
          {data.map((data, idx) => (
            <Grid item key={idx}>
              {data.unit && (
                <Chip
                  label={data.unit}
                  className={classes.normalUnitColor}
                  onDelete={!editable ? undefined : () => handleDelete(idx)}
                />
              )}
              {data.command && (
                <Chip
                  label={data.command}
                  className={classes.incomingCommandColor}
                  onDelete={!editable ? undefined : () => handleDelete(idx)}
                />
              )}
              {data.screen && (
                <Chip
                  label={data.screen}
                  className={classes.firstOnSceenColor}
                  onDelete={!editable ? undefined : () => handleDelete(idx)}
                />
              )}
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
