import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Authenticator,
  SignIn,
  SignUp,
  ConfirmSignUp,
  ForgotPassword,
  RequireNewPassword
} from 'aws-amplify-react'
import Alert from '@material-ui/lab/Alert'
import { Container, Box, MD } from 'mui/Layout'
import useAmplifyAuth from 'hooks/useAmplifyAuth'
import AppBar from 'components/Layout/AppBar/User'
import GuestAppBar from 'components/Layout/AppBar/Guest'
import Footer from 'components/Layout/Footer'
import { authTheme } from 'components/Layout/authTheme'

const useStyles = makeStyles(theme => ({
  offset: theme.mixins.toolbar
}))

export const UserContext = React.createContext()

const Layout = ({ children }) => {
  const classes = useStyles()
  const {
    state: { user, errorMessage },
    handleSignOut,
    handleClearError
  } = useAmplifyAuth()
  return !user ? (
    <>
      <GuestAppBar />
      <div className={classes.offset} />
      <Container>
        <Box my={4}>
          <MD>
            {errorMessage !== '' && (
              <Alert severity='warning' onClose={handleClearError}>
                {errorMessage}
              </Alert>
            )}
            <Authenticator theme={authTheme} hideDefault={true} authState='signIn'>
              <SignIn />
              <SignUp
                signUpConfig={{
                  hiddenDefaults: ['phone_number'],
                  signUpFields: [
                    {
                      label: 'How did you hear about us?',
                      key: 'custom:referral',
                      required: false,
                      displayOrder: 4,
                      type: 'string'
                    }
                  ]
                }}
              />
              <ConfirmSignUp />
              <ForgotPassword />
              <RequireNewPassword />
            </Authenticator>
          </MD>
        </Box>
      </Container>
      <Footer />
    </>
  ) : (
    <UserContext.Provider value={{ user }}>
      <AppBar handleSignOut={handleSignOut} />
      <div className={classes.offset} />
      <Container>
        <Box my={4}>{children}</Box>
      </Container>
      <Footer authType='/demo' />
    </UserContext.Provider>
  )
}

export default Layout
