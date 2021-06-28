import * as React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import MuiAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
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
  const { user, isMember, isAdmin, handleSignOut } =
    React.useContext(UserContext)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [visitorAnchor, setVisitorAnchor] = React.useState(null)
  const [openVisitor, setOpenVisitor] = React.useState(false)
  const [guestAnchor, setGuestAnchor] = React.useState(null)
  const [openGuest, setOpenGuest] = React.useState(false)
  const [memberAnchor, setMemberAnchor] = React.useState(null)
  const [openMember, setOpenMember] = React.useState(false)
  const [adminAnchor, setAdminAnchor] = React.useState(null)
  const [openAdmin, setOpenAdmin] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const closeMenu = () => {
    setOpenVisitor(false)
    setOpenGuest(false)
    setOpenMember(false)
    setOpenAdmin(false)
    setVisitorAnchor(null)
    setGuestAnchor(null)
    setMemberAnchor(null)
    setAdminAnchor(null)
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
              {isAdmin ? (
                <>
                  <DesktopItem
                    key='desktop.visitor'
                    href='#'
                    onClick={(e) => {
                      e.preventDefault()
                      setOpenVisitor(true)
                      setVisitorAnchor(e.currentTarget)
                    }}
                    title='Visitor'
                  />
                  <Menu
                    id='visitor-appbar'
                    anchorEl={visitorAnchor}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    open={openVisitor}
                    onClose={closeMenu}>
                    <MenuItem>
                      <Link href='/' onClick={closeMenu}>
                        Welcome
                      </Link>
                    </MenuItem>
                  </Menu>
                  <DesktopItem
                    key='desktop.guest'
                    href='#'
                    onClick={(e) => {
                      e.preventDefault()
                      setOpenGuest(true)
                      setGuestAnchor(e.currentTarget)
                    }}
                    title='Guest'
                  />
                  <Menu
                    id='guest-appbar'
                    anchorEl={guestAnchor}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    open={openGuest}
                    onClose={closeMenu}>
                    <MenuItem>
                      <Link href='/demo' onClick={closeMenu}>
                        Demo
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href='/subscribe' onClick={closeMenu}>
                        Subscribe
                      </Link>
                    </MenuItem>
                  </Menu>
                  <DesktopItem
                    key='desktop.member'
                    href='#'
                    onClick={(e) => {
                      e.preventDefault()
                      setOpenMember(true)
                      setMemberAnchor(e.currentTarget)
                    }}
                    title='Member'
                  />
                  <Menu
                    id='member-appbar'
                    anchorEl={memberAnchor}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    open={openMember}
                    onClose={closeMenu}>
                    <MenuItem onClick={closeMenu}>
                      <Link href='/profile'>Profile</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href='/evolution/commercial' onClick={closeMenu}>
                        Commercial
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href='/evolution/industrial' onClick={closeMenu}>
                        Industrial
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href='/evolution/single-family' onClick={closeMenu}>
                        Single Family
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href='/evolution/multi-family' onClick={closeMenu}>
                        Multi Family
                      </Link>
                    </MenuItem>
                  </Menu>
                  <DesktopItem
                    key='desktop.admin'
                    href='#'
                    onClick={(e) => {
                      e.preventDefault()
                      setOpenAdmin(true)
                      setAdminAnchor(e.currentTarget)
                    }}
                    title='Admin'
                  />
                  <Menu
                    id='admin-appbar'
                    anchorEl={adminAnchor}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    open={openAdmin}
                    onClose={closeMenu}>
                    <MenuItem>
                      <Link href='/admin/reviews' onClick={closeMenu}>
                        Reviews
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href='/admin/evolutions' onClick={closeMenu}>
                        Evolutions
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href='/admin/incidents' onClick={closeMenu}>
                        Incidents
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href='/admin/debug' onClick={closeMenu}>
                        Debug
                      </Link>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                routes.map((route) => <DesktopItem {...route} />)
              )}
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
