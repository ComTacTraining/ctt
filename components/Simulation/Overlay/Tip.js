import { green, red } from '@material-ui/core/colors'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles'
import AddressedIcon from '@material-ui/icons/CheckCircle'
import UnAddressedIcon from '@material-ui/icons/RemoveCircle'
import PropTypes from 'prop-types'
import React from 'react'

const useStyles = makeStyles(() => ({
  root: {
    padding: 0
  },
  completed: {
    color: green[200],
    fontSize: 'small'
  },
  icon: {
    minWidth: '16px'
  },
  pending: {
    color: red[200],
    fontSize: 'small'
  },
  name: {
    margin: 0
  }
}))

const Tip = ({ title, completed }) => {
  const classes = useStyles()
  return (
    <ListItem className={classes.root}>
      <ListItemIcon className={classes.icon}>
        {completed ? (
          <AddressedIcon className={classes.completed} />
        ) : (
          <UnAddressedIcon className={classes.pending} />
        )}
      </ListItemIcon>
      <ListItemText primary={title} className={classes.name} />
    </ListItem>
  )
}

Tip.propTypes = {
  title: PropTypes.string,
  completed: PropTypes.bool
}

export default Tip
