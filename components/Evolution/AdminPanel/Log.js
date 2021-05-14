import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'
import { H6 } from 'mui/Typography'

const useStyles = makeStyles((theme) => ({
  log: {
    overflowY: 'auto',
    maxHeight: '100vh',
    marginBottom: theme.spacing(2)
  }
}))

const Log = () => {
  const classes = useStyles()
  const { log, start } = useSelector((state) => state.ai)

  const pad = (num) => (num < 10 ? `0${num}` : `${num}`)

  const listItemText = (item) => {
    const primary = `${item.label}: ${item.text}`
    let secondary = ''
    const millisecs = item.timestamp - start
    let secs = Math.floor(millisecs / 1000)

    if (secs >= 3600) {
      const hours = Math.floor(secs / 3600)
      secondary += `${hours}`
      secs -= hours * 3600
    } else {
      secondary += '00'
    }

    if (secs < 3600) {
      secondary += ':'
      const minutes = Math.floor(secs / 60)
      secondary += pad(minutes)
      secs -= minutes * 60
    }
    if (secs < 60) {
      secondary += ':'
      secondary += pad(secs)
    }
    return <ListItemText primary={primary} secondary={secondary} />
  }

  return (
    <Paper className={classes.log}>
      <H6 align='center'>Log</H6>
      <List dense>
        {log.map((item) => (
          <ListItem key={item.timestamp}>{listItemText(item)}</ListItem>
        ))}
      </List>
    </Paper>
  )
}

export default Log
