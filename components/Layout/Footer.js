import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'components/UI/Link'
import { MD } from 'mui/Container'
import { Body2, Caption } from 'mui/Typography'
import { footer as footerRoutes } from 'utils/routes'

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
          {footerRoutes.map(route => <Link key={route.key} href={route.href}>{route.title}</Link>)}
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