// main tools
import { useState } from 'react'

// components
import { Overline, P } from 'mui/Typography'
import { Contained } from 'mui/Button'

// mui components
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
  Checkbox,
  Radio,
  RadioGroup,
  FormControlLabel
} from '@material-ui/core'

// styles
import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  IncommingWarningLabel: {
    color: '#D0021B'
  },
  firstOnSceneColor: {
    color: theme.palette.info.main,
    fontWeight: 900,
    padding: 5
  },
  incomingCommandColor: {
    color: theme.palette.success.main,
    fontWeight: 900,
    padding: 5
  },
  normalUnitColor: {
    color: theme.palette.secondary.main,
    fontWeight: 900,
    padding: 5
  }
}))

export const CustomAlarmDialog = ({ idx, open, data, setOpen, setData }) => {
  const classes = useStyles()
  const [newItem, setNewItem] = useState({ label: 'unit', value: '' })
  const [exists, setExists] = useState('')

  const handleSelected = (ev) => {
    // if (newItem.label !== ev.target.name)
    //   setNewItem({ ...newItem, label: ev.target.name })
    // else setNewItem({ ...newItem, label: 'unit' })
    setNewItem({ ...newItem, label: ev.target.name })
  }

  const handleChange = (ev) => {
    setNewItem({ ...newItem, [ev.target.name]: ev.target.value })
  }

  const handleClose = () => {
    setNewItem({ label: 'unit', value: '' })
    setExists([])
    setOpen(false)
  }

  const handleSave = () => {
    const haveCommand =
      data.filter((item) => item.label === 'command').length > 0
    const haveScreen = data.filter((item) => item.label === 'screen').length > 0

    if (
      (haveCommand && newItem.label === 'command') ||
      (haveScreen && newItem.label === 'screen')
    )
      setExists(newItem.label)
    else if (newItem.value === '') setExists('command')
    else {
      setData([...data, { [newItem.label]: newItem.value }])
      handleClose()
    }
  }

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth='xs'
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'>
      <DialogTitle id='alert-dialog-title'>
        Add {idx === 1 ? 'first' : idx === 2 ? 'second' : 'third'} alarm unit
      </DialogTitle>
      <DialogContent>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            name='value'
            label='Unit Name'
            variant='outlined'
            onChange={handleChange}
            value={newItem.value}
          />
        </Grid>

        {idx === 1 && (
          <>
            <Grid item xs={12} className={classes.checkboxContainer}>
              <Radio
                name='screen'
                inputProps={{ 'aria-label': 'A' }}
                checked={newItem.label === 'screen'}
                onChange={handleSelected}
              />
              <Overline className={classes.firstOnSceneColor}>
                First On Scene
              </Overline>
            </Grid>
            <Grid item xs={12} className={classes.checkboxContainer}>
              <Radio
                name='command'
                inputProps={{ 'aria-label': 'A' }}
                checked={newItem.label === 'command'}
                onChange={handleSelected}
              />
              <Overline className={classes.incomingCommandColor}>
                Incoming Command Officer
              </Overline>
            </Grid>
            <Grid item xs={12} className={classes.checkboxContainer}>
              <Radio
                name='unit'
                inputProps={{ 'aria-label': 'A' }}
                checked={newItem.label === 'unit'}
                onChange={handleSelected}
              />
              <Overline className={classes.normalUnitColor}>None</Overline>
            </Grid>
          </>
        )}

        <Grid container spacing={1} style={{ margin: '20px 0' }}>
          <Grid item xs={6}>
            <Contained fullWidth color='primary' onClick={handleSave}>
              Save
            </Contained>
          </Grid>
          <Grid item xs={6}>
            <Contained fullWidth color='primary' onClick={handleClose}>
              Cancel
            </Contained>
          </Grid>
        </Grid>

        {idx === 1 && (
          <>
            <Grid item xs={12}>
              <P
                className={classes.IncommingWarningLabel}
                style={{ display: exists !== 'screen' && 'none' }}>
                There is already screen value, please delete the previous screen
                and try again.
              </P>
            </Grid>
            <Grid item xs={12}>
              <P
                className={classes.IncommingWarningLabel}
                style={{ display: exists !== 'command' && 'none' }}>
                There is already incomming command value, please delete the
                previous command and try again.
              </P>
            </Grid>
            <Grid item xs={12}>
              <P
                className={classes.IncommingWarningLabel}
                style={{ display: exists !== 'noText' && 'none' }}>
                Please insert a title
              </P>
            </Grid>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
