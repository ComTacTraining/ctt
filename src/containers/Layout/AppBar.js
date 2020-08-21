import React from 'react';
import { Link } from 'react-router-dom';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import { makeStyles } from '@material-ui/core/styles';
import MUIAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ProfileIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  profileButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const AppBar = () => {
  const classes = useStyles();

  return (
    <MUIAppBar position="fixed">
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          className={classes.profileButton}
          component={Link}
          to='/profile'
        >
          <ProfileIcon />
        </IconButton>
        <Typography variant="h6" noWrap className={classes.title}>
          Command Tactical Training
        </Typography>
        <AmplifySignOut />
      </Toolbar>
    </MUIAppBar>
  );
};

export default AppBar;