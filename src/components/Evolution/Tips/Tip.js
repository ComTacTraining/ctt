import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddressedIcon from '@material-ui/icons/CheckCircle';
import UnAddressedIcon from '@material-ui/icons/RemoveCircle';

const useStyles = makeStyles(() => ({
  completed: {
    color: green[200],
    fontSize: 'small'
  },
  pending: {
    color: red[200],
    fontSize: 'small'
  },

}));

const Tip = ({ title, completed }) => {
  const classes = useStyles();
  return (
    <ListItem alignItems="flex-start">
      <ListItemIcon>
        {completed ? <AddressedIcon className={classes.completed} /> : <UnAddressedIcon className={classes.pending} />}
      </ListItemIcon>
      <ListItemText primary={title} />
    </ListItem>
  );
}

export default Tip;

