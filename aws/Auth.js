import {
  Authenticator,
  SignIn as AWSSignIn,
  SignUp as AWSSignUp,
  ConfirmSignUp,
  ForgotPassword,
  RequireNewPassword
} from 'aws-amplify-react'
import { AmplifyContainer, AmplifyAuthenticator, AmplifySignUp, AmplifySignIn } from '@aws-amplify/ui-react'
import useUser from 'hooks/useUser'
import { awsTheme } from 'aws/theme'

export const SignUp = () => {
  return (
  <Authenticator theme={awsTheme} hideDefault={true} authState='signUp'>
    <AWSSignUp
      signUpConfig={{
        hiddenDefaults: ['phone_number'],
        usernameAlias: 'email',
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
  </Authenticator>
  )
}

export const SignIn = () => {
  return (
    <Authenticator theme={awsTheme} hideDefault={true} authState='signIn'>
      <AWSSignIn />
      <ForgotPassword />
      <RequireNewPassword />
    </Authenticator>
  )
}

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
 