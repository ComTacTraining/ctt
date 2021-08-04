import { useUser } from '@/hooks/useUser'
import { AmplifyAuthenticator, AmplifySignUp } from '@aws-amplify/ui-react'
import * as React from 'react'

const SignUp = () => {
  const { user } = useUser()

  return !user ? (
    <AmplifyAuthenticator usernameAlias='email'>
      <AmplifySignUp
        slot='sign-up'
        headerText='Sign up for a free demo'
        formFields={[{ type: 'email' }, { type: 'password' }]}></AmplifySignUp>
    </AmplifyAuthenticator>
  ) : (
    <pre>{JSON.stringify(user, null, 2)}</pre>
  )
}

export default SignUp
