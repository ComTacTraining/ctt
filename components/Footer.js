import Image from 'next/image'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import { Body2, Caption } from 'mui/Typography'
import { MD } from 'mui/Container'
import Link from './Link'

const useStyles = makeStyles(theme => ({
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(4),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(4),
    },
  },
  nav: {
    '& > *': {
      padding: theme.spacing(1)
    }
  }
}))

const Footer = () => {
  const classes = useStyles()
  return (
    <MD component="footer" className={classes.footer}>
      <Box mt={5}>
        <Caption color="textSecondary" align="center" className={classes.nav} gutterBottom>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
          <Link href="/refund">Refund Policy</Link>
        </Caption>
        <Body2 color="textSecondary" align="center">
          {'© '}
          {new Date().getFullYear()}
          {' Command Tactical Training'}
        </Body2>
      </Box>
    </MD>
  )
}

export default Footer