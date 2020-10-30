import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: `${theme.spacing(4)}px auto`,
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="caption" align="center">Copyright &copy; Command Tactical Training | <Link component={RouterLink} to='/privacy-policy'>Privacy Policy</Link> | <Link component={RouterLink} to='/terms-of-service'>Terms of Service</Link> | <Link component={RouterLink} to='/refund-policy'>Refund Policy</Link></Typography>
    </div>
  );
};

export default Footer;
