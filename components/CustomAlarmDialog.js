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
} from '@material-ui/core'

// styles
import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() => ({
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  IncommingWarningLabel: {
    color: '#D0021B',
  },
}))

export const CustomAlarmDialog = ({ idx, open, data, setOpen, setData }) => {
  const classes = useStyles()
  const [newItem, setNewItem] = useState({ label: [], value: '' })
  const [exists, setExists] = useState('')

  const handleSelected = (ev) => {
    if (newItem.label.indexOf(ev.target.name) !== -1)
      setNewItem({
        ...newItem,
        label: newItem.label.filter((item) => item !== ev.target.name),
      })
    else setNewItem({ ...newItem, label: [...newItem.label, ev.target.name] })
  }

  const handleChange = (ev) =>
    setNewItem({ ...newItem, [ev.target.name]: ev.target.value })

  const handleClose = () => {
    setNewItem({ label: [], value: '' })
    setExists([])
    setOpen(false)
  }

  const handleSave = () => {
    const haveCommand =
      data.filter((item) => item.label.indexOf('command') !== -1).length > 0
    const haveScreen =
      data.filter((item) => item.label.indexOf('screen') !== -1).length > 0
    const updateExists = []

    if (haveCommand && newItem.label.indexOf('command') !== -1)
      updateExists.push('command')
    if (haveScreen && newItem.label.indexOf('screen') !== -1)
      updateExists.push('screen')
    if (newItem.value === '') updateExists.push('noText')

    if (updateExists.length > 0) setExists(updateExists)
    else {
      setData([...data, { ...newItem }])
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
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title' style={{ width: '380px' }}>
        Add new unit of alarm {idx}
      </DialogTitle>
      <DialogContent>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            name='value'
            label='Alarm Title'
            variant='outlined'
            onChange={handleChange}
            value={newItem.value}
          />
        </Grid>

        {idx === 1 && (
          <>
            <Grid item xs={12} className={classes.checkboxContainer}>
              <Checkbox
                name='screen'
                label='Show Tips'
                variant='outlined'
                checked={newItem.label.indexOf('screen') !== -1}
                onChange={handleSelected}
                className={classes.OnSceneCheckbox}
              />
              <Overline>First On Scene</Overline>
            </Grid>
            <Grid item xs={12} className={classes.checkboxContainer}>
              <Checkbox
                name='command'
                label='Show Tips'
                variant='outlined'
                checked={newItem.label.indexOf('command') !== -1}
                onChange={handleSelected}
                className={classes.IncommingCheckbox}
              />
              <Overline className={classes.IncommingLabel}>
                Incomming Command Center
              </Overline>
            </Grid>
          </>
        )}

        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Contained
              fullWidth
              color='primary'
              onClick={handleSave}
              style={{ margin: '20px 0' }}
            >
              Save
            </Contained>
          </Grid>
          <Grid item xs={6}>
            <Contained
              fullWidth
              color='primary'
              onClick={handleClose}
              style={{ margin: '20px 0' }}
            >
              Cancel
            </Contained>
          </Grid>
        </Grid>

        {idx === 1 && (
          <>
            <Grid item xs={12}>
              <P
                className={classes.IncommingWarningLabel}
                style={{ display: exists.indexOf('screen') === -1 && 'none' }}
              >
                There is already screen value, please delete the previous screen
                and try again.
              </P>
            </Grid>
            <Grid item xs={12}>
              <P
                className={classes.IncommingWarningLabel}
                style={{ display: exists.indexOf('command') === -1 && 'none' }}
              >
                There is already incomming command value, please delete the
                previous command and try again.
              </P>
            </Grid>
            <Grid item xs={12}>
              <P
                className={classes.IncommingWarningLabel}
                style={{ display: exists.indexOf('noText') === -1 && 'none' }}
              >
                Please insert a title
              </P>
            </Grid>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
