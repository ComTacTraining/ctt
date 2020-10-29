import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from './AppBar';
import Body from './Body';
import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
  appBarSpacing: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar />
      <main className={classes.content}>
        <div className={classes.appBarSpacing} />
        <Body>{children}</Body>
        <Footer />
      </main>
    </div>
  )
};

export default Layout;
