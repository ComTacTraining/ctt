// import { SignUp } from 'aws/Auth'
import { AmplifyAuthenticator } from '@aws-amplify/ui-react';
import useAmplifyAuth from 'hooks/useAmplifyAuth'

const SignUpPage = () => {
  const {
    state: { user, errorMessage },
    handleSignOut,
    handleClearError
  } = useAmplifyAuth()

  return !user ? (
    <AmplifyAuthenticator usernameAlias="email" />
  ) : (
    <p>Signed in!</p>
  )
}

export default SignUpPage