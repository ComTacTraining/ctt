import React, { useEffect, useState } from "react";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import CategoryLinks from "./CategoryLinks";
import Grid from "@material-ui/core/Grid";
import { updateProfile } from "graphql/mutations";
import { getProfile } from "graphql/queries";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  settings: {
    marginTop: theme.spacing(4)
  }
}));

const Profile = () => {
  const classes = useStyles();
  const [showSettings, setShowSettings] = useState(false);
  const [profile, setProfile] = useState({});
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const waitForAuth = async () => {
      const response = await Auth.currentAuthenticatedUser();
      setUsername(response.username);
    };
    waitForAuth();
  }, []);

  useEffect(() => {
    const waitForProfile = async () => {
      try {
        const { data } = await API.graphql(
          graphqlOperation(getProfile, { user: `${username}` })
        );
        const obj = {
          id: data.getMember.id,
          alias: data.getMember.alias,
          department: data.getMember.department,
          rank: data.getMember.rank,
          dispatchCenter: data.getMember.dispatchCenter,
          alarm1: data.getMember.alarm1,
          alarm2: data.getMember.alarm2,
          alarm3: data.getMember.alarm3,
          showTips: data.getMember.showTips
        };
        setProfile(obj);
      } catch (err) {
        console.log(err);
      }
    };

    if (username) {
      waitForProfile();
    }
  }, [username]);

  const handleChange = prop => event => {
    setProfile({ ...profile, [prop]: event.target.value });
  };

  const handleTipsChange = event => {
    setProfile({ ...profile, showTips: event.target.checked });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const alarm1 = profile.alarm1.split(",");
    let input = {
      ...profile,
      firstOnScene: alarm1.shift().trim(),
      incomingCommandOfficer: alarm1.pop().trim()
    };
    await API.graphql(graphqlOperation(updateProfile, { input }));
    setShowSettings(false);
  };

  const handleShowSettings = () => {
    setShowSettings(true);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h2" noWrap>
        Profile
      </Typography>

      <Typography paragraph>
        Click a building type to begin an Evolution.
      </Typography>

      <CategoryLinks />

      {!showSettings && (
        <Button
          onClick={handleShowSettings}
          variant="contained"
          color="secondary"
        >
          Edit Profile
        </Button>
      )}

      {showSettings && (
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              <Grid item xs={6}>
                <form onSubmit={handleSubmit}>
                  <FormControl fullWidth className={classes.settings}>
                    <FormLabel component="legend">Profile Settings</FormLabel>
                    <TextField
                      id="outlined-basic"
                      label="Alias"
                      variant="outlined"
                      value={profile.alias}
                      onChange={handleChange("alias")}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Department"
                      variant="outlined"
                      value={profile.department}
                      onChange={handleChange("department")}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Rank"
                      variant="outlined"
                      value={profile.rank}
                      onChange={handleChange("rank")}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Dispatch Name"
                      variant="outlined"
                      value={profile.dispatchCenter}
                      onChange={handleChange("dispatchCenter")}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Alarms 1"
                      variant="outlined"
                      value={profile.alarm1}
                      onChange={handleChange("alarm1")}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Alarms 2"
                      variant="outlined"
                      value={profile.alarm2}
                      onChange={handleChange("alarm2")}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Alarms 3"
                      variant="outlined"
                      value={profile.alarm3}
                      onChange={handleChange("alarm3")}
                    />
                    <FormControlLabel
                      label="Show Tips"
                      control={
                        <Checkbox
                          checked={profile.showTips}
                          onChange={handleTipsChange}
                          name="showTips"
                          color="primary"
                        />
                      }
                    />
                    <Grid container>
                      <Grid item xs={6}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="secondary"
                        >
                          Update
                        </Button>
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
