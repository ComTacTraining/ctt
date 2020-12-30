import { useState, useEffect } from 'react'
import { H3, P } from 'mui/Typography'
import { AmplifyAuthenticator, AmplifyContainer, AmplifySignUp, AmplifySignIn } from '@aws-amplify/ui-react'
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components'
import { configure } from 'aws/Amplify'
configure()

const Auth = () => {
  const [authState, setAuthState] = useState()
  const [user, setUser] = useState()
  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState)
      setUser(authData)
    })
  }, [])
  
  return authState === AuthState.SignedIn && user ? (
    <>
      <H3>Welcome, {user.username}</H3>
      <P>You are now signed in!</P>
    </>
  ) : (
    <>
      <AmplifyContainer>
        <AmplifyAuthenticator>
          <AmplifySignUp slot="sign-up" headerText="Sign up for a free demo" formFields={[
            { type: "username" },
            { type: "password" },
            { type: "email" }
          ]}></AmplifySignUp>
          <AmplifySignIn slot="sign-in" headerText="Have an account? Sign in."></AmplifySignIn>
        </AmplifyAuthenticator>
      </AmplifyContainer>
    </>
  )
}

export default Auth