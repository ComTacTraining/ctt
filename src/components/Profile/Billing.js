import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
}));

const Billing = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      
    </div>
  );
};

export default Billing;