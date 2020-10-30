import React, { useEffect, useState } from 'react';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import CategoryLinks from './CategoryLinks';
import Grid from '@material-ui/core/Grid';
import { createMember, updateMember } from 'graphql/mutations';
import { listMembers } from 'graphql/queries';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  settings: {
    marginTop: theme.spacing(4)
  }
}));

const Profile = () => {
  const classes = useStyles();
  const [showSettings, setShowSettings] = useState(false);
  const [profile, setProfile] = useState({});
  const [hasProfile, setHasProfile] = useState(false);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const waitForAuth = async () => {
      const user = await Auth.currentAuthenticatedUser();
      setUsername(user.username);
      setProfile({
        alias: '',
        department: '',
        rank: '',
        dispatchCenter: 'Dispatch',
        firstOnScene: 'Engine 1',
        incomingCommandOfficer: 'Battalion 1',
        alarm1: 'Engine 1, Engine 2, Engine 3, Truck 1, Truck 2, Battalion 1',
        alarm2: 'Engine 21, Engine 22, Engine 23, Truck 21, Truck 22, Battalion 2',
        alarm3: 'Engine 31, Engine 32, Engine 33, Truck 31, Truck 32, Battalion 3',
        showTips: true
      });
    }
    waitForAuth();
  }, []);



  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const members = await API.graphql(graphqlOperation(listMembers));
        if (members.data.listMembers.items.length > 0) {
          const member = members.data.listMembers.items.find((item) => item.owner === username);
          setHasProfile(true);
          setProfile(member);
        }
      } catch (err) {
        console.log(err)
      }
    };
    
    if (username) {
      fetchProfile();
    }
  }, [username])

  const handleChange = (prop) => (event) => {
    setProfile({ ...profile, [prop]: event.target.value });
  }

  const handleTipsChange = (event) => {
    setProfile({ ...profile, showTips: event.target.checked });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (hasProfile) {
      await API.graphql(graphqlOperation(updateMember, {input: profile}));
    } else {
      await API.graphql(graphqlOperation(createMember, {input: profile}));
    }
    
    // setShowSettings(false);
  }

  const handleShowSettings = () => {
    setShowSettings(true);
  }

  return (
    <div className={classes.root}>
      <Typography variant="h2" noWrap>Profile</Typography>
      
      <Typography paragraph>
        Click a building type to begin an Evolution.
      </Typography>

      <CategoryLinks />

      {!showSettings && <Button onClick={handleShowSettings} variant="contained" color="secondary">Edit Profile</Button>}

      {showSettings && (
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              <Grid item xs={6}>
                <form onSubmit={handleSubmit}>
                  <FormControl fullWidth className={classes.settings}>
                    <FormLabel component="legend">Profile Settings</FormLabel>
                    <TextField id="outlined-basic" label="Alias" variant="outlined" value={profile.alias} onChange={handleChange('alias')} />
                    <TextField id="outlined-basic" label="Department" variant="outlined" value={profile.department} onChange={handleChange('department')} />
                    <TextField id="outlined-basic" label="Rank" variant="outlined" value={profile.rank} onChange={handleChange('rank')} />
                    <TextField id="outlined-basic" label="Dispatch Name" variant="outlined"  value={profile.dispatchCenter} onChange={handleChange('dispatchCenter')} />
                    <TextField id="outlined-basic" label="Alarms 1" variant="outlined" value={profile.alarm1} onChange={handleChange('alarm1')} />
                    <TextField id="outlined-basic" label="Alarms 2" variant="outlined" value={profile.alarm2} onChange={handleChange('alarm2')} />
                    <TextField id="outlined-basic" label="Alarms 3" variant="outlined" value={profile.alarm3} onChange={handleChange('alarm3')} />
                    <FormControlLabel label="Show Tips" control={
                      <Checkbox
                        checked={profile.showTips}
                        onChange={handleTipsChange}
                        name="showTips"
                        color="primary"
                      />
                    }
                      
                    />
                    <Grid container >
                      <Grid item xs={6}>
                        <Button type="submit" variant="contained" color="secondary">Update</Button>
                      </Grid>
                    </Grid>
                  </FormControl>
                </form>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Profile;