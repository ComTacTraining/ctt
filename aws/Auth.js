import { AmplifyContainer, AmplifyAuthenticator, AmplifySignUp, AmplifySignIn } from '@aws-amplify/ui-react'
import useUser from 'hooks/useUser'

export const Authenticate = () => {
  const { loading, user } = useUser()
  if (!loading && user) {
    return null
  }
  return (
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
  )
}
 