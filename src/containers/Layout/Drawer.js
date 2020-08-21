import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MUIDrawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CommercialIcon from '@material-ui/icons/Store';
import IndustrialIcon from '@material-ui/icons/Storefront';
import SingleFamilyIcon from '@material-ui/icons/Home';
import MultiFamilyIcon from '@material-ui/icons/Apartment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ReplayIcon from '@material-ui/icons/Replay';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  }
}));
 
 const Drawer = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

   return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            Command Tactical Training
          </Typography>
          <AmplifySignOut />
        </Toolbar>
      </AppBar>
      <MUIDrawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button component={Link} to='/evolution/commercial' key='Commercial'>
            <ListItemIcon><CommercialIcon /></ListItemIcon>
            <ListItemText primary='Commercial' />
          </ListItem>
          <ListItem button component={Link} to='/evolution/industrial' key='Industrial'>
            <ListItemIcon><IndustrialIcon /></ListItemIcon>
            <ListItemText primary='Industrial' />
          </ListItem>
          <ListItem button component={Link} to='/evolution/single-family' key='Single Family'>
            <ListItemIcon><SingleFamilyIcon /></ListItemIcon>
            <ListItemText primary='Single Family' />
          </ListItem>
          <ListItem button component={Link} to='/evolution/multi-family' key='Multi Family'>
            <ListItemIcon><MultiFamilyIcon /></ListItemIcon>
            <ListItemText primary='Multi Family' />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button component={Link} to='/profile' key='Profile'>
            <ListItemIcon><AccountCircleIcon /></ListItemIcon>
            <ListItemText primary='Profile' />
          </ListItem>
          <ListItem button component={Link} to='/reviews' key='Reviews'>
            <ListItemIcon><ReplayIcon /></ListItemIcon>
            <ListItemText primary='Reviews' />
          </ListItem>
        </List>
      </MUIDrawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Body>{children}</Body>
        <Footer />
      </main>
    </div>
  );
};

export default Drawer;
