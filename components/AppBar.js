import * as React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import MuiAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import Icon from '@material-ui/core/Icon'
import { H6 } from 'mui/Typography'
import Link from './Link'
import MobileItem from './Layout/MobileItem'
import DesktopItem from './Layout/DesktopItem'
import { UserContext } from './Auth/UserContext'
import { visitor, guest, member, admin } from 'utils/routes'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(2)
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  drawerPaper: {
    width: drawerWidth
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white
  },
  toolbar: theme.mixins.toolbar,
  logo: {
    marginRight: theme.spacing(8),
    stroke: 1
  },
  offset: theme.mixins.toolbar
}))

const AppBar = ({ window }) => {
  const classes = useStyles()
  const { user, isMember, isAdmin, handleSignOut } = React.useContext(
    UserContext
  )
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const container =
    window !== undefined ? () => window().document.body : undefined

  const routes = user ? (isAdmin ? admin : isMember ? member : guest) : visitor

  return (
    <>
      <MuiAppBar
        position='fixed'
        color='inherit'
        elevation={0}
        className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerToggle}>
            <Icon className='fas fa-bars' />
          </IconButton>
          <Link href='/' color='inherit' className='class.logo'>
            <img
              src='/logo-stroke.png'
              alt='Logo'
              width={42}
              height={42}
              className={classes.logo}
            />
          </Link>
          <H6 className={classes.title} noWrap>
            <Link href='/' color='inherit'>
              Command Tactical Training
            </Link>
          </H6>
          <nav>
            <Hidden smUp implementation='css'>
              <Drawer
                container={container}
                variant='temporary'
                anchor='left'
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{ paper: classes.drawerPaper }}>
                <div className={classes.toolbar} />
                <Divider />
                <List>
                  {routes.map((route) => (
                    <MobileItem {...route} />
                  ))}
                  {user && (
                    <MobileItem
                      key='mobile.signout'
                      href='#'
                      onClick={() => handleSignOut()}
                      title='Sign Out'
                      fa='fa-door-open'
                    />
                  )}
                </List>
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation='css'>
              {routes.map((route) => (
                <DesktopItem {...route} />
              ))}
              {user && (
                <DesktopItem
                  key='desktop.signout'
                  href='#'
                  onClick={() => handleSignOut()}
                  title='Sign Out'
                />
              )}
            </Hidden>
          </nav>
        </Toolbar>
      </MuiAppBar>
      <div className={classes.offset} />
    </>
  )
}

AppBar.propTypes = {
  window: PropTypes.func
}

export default AppBar
