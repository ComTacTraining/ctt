import { useState, useEffect } from 'react'
import { H3, P } from 'mui/Typography'
import { AmplifyAuthenticator, AmplifyContainer, AmplifySignUp, AmplifySignIn } from '@aws-amplify/ui-react'
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components'

const Demo = () => {
  const [authState, setAuthState] = useState()
  const [user, setUser] = useState()
  // const { loading, user } = useUser()
  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState)
      setUser(authData)
    })
  }, [])
  return authState === AuthState.SignedIn && user ? (
    <>
      <H3>Demo</H3>
      <P>Hello {user.username}!</P>
    </>
  ) : (
    <AmplifyContainer>
      <AmplifyAuthenticator>
        <AmplifySignUp slot="sign-up" headerText="Sign up for a free demo" formFields={[
          { type: "username" },
          { type: "password" },
          { type: "email" }
        ]}></AmplifySignUp>
      </AmplifyAuthenticator>
    </AmplifyContainer>
  )
}

export default Demo