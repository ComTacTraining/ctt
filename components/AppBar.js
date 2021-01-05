import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
// import Image from 'next/image'
import { Auth } from 'aws-amplify'
import { makeStyles } from '@material-ui/core/styles'
import MuiAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import Icon from '@material-ui/core/Icon'
import MuiLink from '@material-ui/core/Link'
import { H6 } from 'mui/Typography'
import useUser from 'hooks/useUser'
import Link from './Link'
import SignIn from './SignIn'
import MobileItem from './MobileItem'
import DesktopItem from './DesktopItem'

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
}))

const AppBar = ({ window, user }) => {
  const classes = useStyles()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [isSignedIn, setIsSignedIn] = useState(false)
  // const [isMember, setIsMember] = useState(false)

  useEffect(() => {
    if (user) {
      setIsSignedIn(true)
    }
    else {
      setIsSignedIn(false)
    }
  }, [user])
  const open = Boolean(anchorEl)
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  }
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const container = window !== undefined ? () => window().document.body : undefined
  const signedOutLinks = [
    { key: 'home', href: '/', title: 'Home', fa: 'fa-home' },
    { key: 'signin', href: '/profile', title: 'Sign In', fa: 'fa-door-open' },
  ]
  const signedInLinks = [
    { key: 'subscribe', href: '/subscribe', title: 'Subscribe', fa: 'fa-user-circle' },
    { key: 'demo', href: '/demo', title: 'Demo', fa: 'fa-tv' },
  ]
  const memberLinks = [
    { key: 'profile', href: '/profile', title: 'Profile', fa: 'fa-user-circle' },
    { key: 'commercial', href: '/evolution/commercial', title: 'Commercial', fa: 'fa-store' },
    { key: 'industrial', href: '/evolution/industrial', title: 'Industrial', fa: 'fa-warehouse' },
    { key: 'multi-family', href: '/evolution/multi-family', title: 'Multi-Family', fa: 'fa-building' },
    { key: 'single-family', href: '/evolution/single-family', title: 'Single-Family', fa: 'fa-home' },
  ]
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
                <>
                  {isSignedIn ? (
                    <>
                      {/* {isMember ? (
                        <>
                          {signedInLinks.map(l => <MobileItem key={l.key} href={l.href} title={l.title} fa={l.fa} />)}
                        </>
                      ) : (
                        <> */}
                          {memberLinks.map(l => <MobileItem key={l.key} href={l.href} title={l.title} fa={l.fa} />)}
                        {/* </>
                      )} */}
                      <MobileItem key="signout" onClick={() => Auth.signOut()} href="#" title="Sign Out" fa="fa-door-open" />
                    </>
                  ) : (
                    <>
                      {signedOutLinks.map(l => <MobileItem key={l.key} href={l.href} title={l.title} fa={l.fa} />)}
                    </>
                  )}
                </>
              </List>
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <>
              {isSignedIn ? (
                <>
                  {/* {isMember ? (
                    <>
                      {memberLinks.map(l => <DesktopItem key={l.key} href={l.href} title={l.title} />)}
                    </>
                  ) : (
                    <> */}
                      {signedInLinks.map(l => <DesktopItem key={l.key} href={l.href} title={l.title} />)}
                    {/* </>
                  )} */}
                  
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <Icon className="fas fa-user-circle" />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}><Link href="/profile">Profile</Link></MenuItem>
                    <MenuItem onClick={() => Auth.signOut()}><MuiLink>Logout</MuiLink></MenuItem>
                  </Menu>
                </>
              ) : (
                <SignIn />
              )}
            </>
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