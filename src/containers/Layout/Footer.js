import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <Typography paragraph>Copyright &copy; Command Tactical Training | <Link component={RouterLink} to='/privacy-policy'>Privacy Policy</Link> | <Link component={RouterLink} to='/terms-of-service'>Terms of Service</Link> | <Link component={RouterLink} to='/refund-policy'>Refund Policy</Link></Typography>
    </>
  );
};

export default Footer;
