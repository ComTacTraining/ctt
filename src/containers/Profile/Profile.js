import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CategoryLinks from './CategoryLinks';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const Profile = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h2" noWrap>Profile</Typography>
      
      <Typography paragraph>
        Click a building type to begin an Evolution.
      </Typography>

      <CategoryLinks />
    </div>
  );
};

export default Profile;