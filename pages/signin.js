import AWSTheme from '@/components/Layout/AWSTheme'
import { useUser } from '@/hooks/useUser'
import {
  AmplifyAuthenticator,
  AmplifyContainer,
  AmplifySignIn,
  AmplifySignUp
} from '@aws-amplify/ui-react'
import Alert from '@material-ui/lab/Alert'
import { useRouter } from 'next/router'
import * as React from 'react'

const SignInPage = () => {
  const router = useRouter()
  const { user, errorMessage, handleClearError } = useUser()
  const [displayedError, setDisplayedError] = React.useState('')

  React.useEffect(() => {
    if (errorMessage !== '') {
      if (/incorrect.*username.*password/i.test(errorMessage)) {
        setDisplayedError('Incorrect username or password')
      } else if (/username.*expression/i.test(errorMessage)) {
        setDisplayedError('Username may not contain spaces')
      } else {
        setDisplayedError(errorMessage)
      }
    }
  }, [errorMessage])

  React.useEffect(() => {
    if (user) {
      router.push('/profile')
    }
  }, [user])

  return (
    <>
      {displayedError !== '' && (
        <Alert severity='warning' onClose={handleClearError}>
          {displayedError}
        </Alert>
      )}
      <AWSTheme>
        <AmplifyContainer>
          <AmplifyAuthenticator usernameAlias='email' initialAuthState='signin'>
            <AmplifySignIn
              slot='sign-in'
              usernameAlias='email'
              headerText='Sign in to your account'></AmplifySignIn>
            <AmplifySignUp
              slot='sign-up'
              usernameAlias='email'
              headerText='Sign up for a free demo'
              formFields={[
                { type: 'email' },
                { type: 'password' },
                {
                  type: 'custom:referral',
                  label: 'How did you hear about us?',
                  required: false
                }
              ]}></AmplifySignUp>
          </AmplifyAuthenticator>
        </AmplifyContainer>
      </AWSTheme>
    </>
  )
}

export default SignInPage
