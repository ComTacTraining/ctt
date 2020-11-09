import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Footer from "./Footer";
import logo from "assets/images/logo.png";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: 0
  },
  logo: {
    maxWidth: "125px",
    marginBottom: theme.spacing(3)
  }
}));

const GuestLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <Grid container justify="center">
          <Grid item>
            <Link to="/demo">
              <img
                src={logo}
                className={classes.logo}
                alt="Command Tactical Training"
              />
            </Link>
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Grid item>{children}</Grid>
        </Grid>
        <Footer />
      </main>
    </div>
  );
};

GuestLayout.propTypes = {
  children: PropTypes.element.isRequired
};

export default GuestLayout;
