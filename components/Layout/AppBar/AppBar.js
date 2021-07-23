import MuiAppBar from '@material-ui/core/AppBar'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import { UserContext } from 'components/Auth/UserContext'
import Link from 'components/UI/Link'
import { H6 } from 'mui/Typography'
import PropTypes from 'prop-types'
import * as React from 'react'
import { guest, member, visitor } from 'utils/routes'
import AdminBar from './AdminBar'
import DesktopItem from './DesktopItem'
import MobileItem from './MobileItem'

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
  const [isUserAnAdmin, setIsUserAnAdmin] = React.useState(false)

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

  const routes = user ? isMember ? member : guest : visitor

  React.useEffect(() => {
    if (user && isAdmin) {
      setIsUserAnAdmin(true)
    } else {
      setIsUserAnAdmin(false)
    }
  }, [user, isAdmin])

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
              {isUserAnAdmin ? (
                <AdminBar />
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
