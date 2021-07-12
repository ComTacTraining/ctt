import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { green, red } from '@material-ui/core/colors'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AddressedIcon from '@material-ui/icons/CheckCircle'
import UnAddressedIcon from '@material-ui/icons/RemoveCircle'

const useStyles = makeStyles(() => ({
  root: {
    padding: 0
  },
  completed: {
    color: green[200],
    fontSize: 'small'
  },
  pending: {
    color: red[200],
    fontSize: 'small'
  }
}))

const Tip = ({ title, completed }) => {
  const classes = useStyles()
  return (
    <ListItem className={classes.root}>
      <ListItemIcon style={{ minWidth: '24px' }}>
        {completed ? (
          <AddressedIcon className={classes.completed} />
        ) : (
          <UnAddressedIcon className={classes.pending} />
        )}
      </ListItemIcon>
      <ListItemText primary={title} />
    </ListItem>
  )
}

Tip.propTypes = {
  title: PropTypes.string,
  completed: PropTypes.bool
}

export default Tip
