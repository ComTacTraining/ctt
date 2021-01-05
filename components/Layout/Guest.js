import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Box } from 'mui/Layout'
import AppBar from 'components/Layout/AppBar/Guest'
import Footer from 'components/Layout/Footer'

const useStyles = makeStyles(theme => ({
  offset: theme.mixins.toolbar
}))

const Layout = ({ children }) => {
  const classes = useStyles()
  return (
    <>
      <AppBar />
      <div className={classes.offset} />
      <Container>
        <Box my={4}>{children}</Box>
      </Container>
      <Footer />
    </>
  )
}

export default Layout
