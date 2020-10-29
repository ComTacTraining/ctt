import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CategoryLinks from './CategoryLinks';
// import Alarms from '../../components/Profile/Alarms';
// import TextField from '@material-ui/core/TextField';
// import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';
// import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const Profile = () => {
  const classes = useStyles();

  // const handleChange = (e) => {
  //   console.log(e);
  // }

  return (
    <div className={classes.root}>
      <Typography variant="h2" noWrap>Profile</Typography>
      
      <Typography paragraph>
        Click a building type to begin an Evolution.
      </Typography>

      <CategoryLinks />
      {/* <FormControl component="fieldset">
        <FormLabel component="legend">Profile Settings</FormLabel>
        <TextField id="outlined-basic" label="Alias" variant="outlined" onChange={handleChange} />
        <TextField id="outlined-basic" label="Department" variant="outlined" onChange={handleChange} />
        <TextField id="outlined-basic" label="Rank" variant="outlined" onChange={handleChange} />
        <TextField id="outlined-basic" label="Dispatch Name" variant="outlined" onChange={handleChange} />
        <TextField id="outlined-basic" label="Alarms 1" variant="outlined" onChange={handleChange} />
        <TextField id="outlined-basic" label="Alarms 2" variant="outlined" onChange={handleChange} />
        <TextField id="outlined-basic" label="Alarms 3" variant="outlined" onChange={handleChange} />
        <Button>Update</Button>
      </FormControl> */}

      {/* <Alarms /> */}
    </div>
  );
};

export default Profile;