import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: `${theme.spacing(4)}px`,
    flexGrow: 1
  },
  selected: {
    color: theme.palette.grey[600]
  }
}));

const Footer = () => {
  const location = useLocation();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="caption" align="center" display="block">
        Copyright &copy; Command Tactical Training |{" "}
        <Link
          component={RouterLink}
          to="/privacy-policy"
          className={
            location.pathname === "/privacy-policy" ? classes.selected : null
          }
        >
          Privacy Policy
        </Link>{" "}
        |{" "}
        <Link
          component={RouterLink}
          to="/terms-of-service"
          className={
            location.pathname === "/terms-of-service" ? classes.selected : null
          }
        >
          Terms of Service
        </Link>{" "}
        |{" "}
        <Link
          component={RouterLink}
          to="/refund-policy"
          className={
            location.pathname === "/refund-policy" ? classes.selected : null
          }
        >
          Refund Policy
        </Link>
      </Typography>
    </div>
  );
};

export default Footer;
