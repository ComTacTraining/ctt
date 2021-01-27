import { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import MuiAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import Icon from '@material-ui/core/Icon'
import { H6 } from 'mui/Typography'
import Link from 'components/Link'
import MobileItem from 'components/Layout/AppBar/Item/MobileItem'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(2)
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  toolbar: theme.mixins.toolbar,
  logo: {
    marginRight: theme.spacing(8),
    stroke: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
    color: theme.palette.primary.contrastText,
  }
}))

const AppBar = ({ window }) => {
  const classes = useStyles()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const open = Boolean(anchorEl)
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  }
  const container = window !== undefined ? () => window().document.body : undefined
  return (
    <MuiAppBar position="fixed" color="inherit" elevation={0} className={classes.appBar}>
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="open drawer" onClick={handleDrawerToggle}>
          <Icon className="fas fa-bars" />
        </IconButton>
        <Link href="/" color="inherit" className="class.logo">
          <img src="/logo-stroke.png" alt="Logo" width={42} height={42} className={classes.logo} />
        </Link>
        <H6 className={classes.title} noWrap>
          <Link href="/" color="inherit">
            Command Tactical Training
          </Link>
        </H6>
        <nav>
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor="left"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{ paper: classes.drawerPaper }}
            >
              <div className={classes.toolbar} />
              <Divider />
              <List>
                <MobileItem key='home' href='/' title='Home' fa='fa-home' />
                <MobileItem key='signin' href='/demo' title='Sign In' fa='fa-door-open' />
              </List>
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Link variant="button" color="textPrimary" href='/demo' className={classes.link}>Sign In</Link>
          </Hidden>
        </nav>
      </Toolbar>
    </MuiAppBar>
  )
}

AppBar.propTypes = {
  window: PropTypes.func
}

export default AppBar