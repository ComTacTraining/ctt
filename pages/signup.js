import AWSTheme from '@/components/Layout/AWSTheme'
import Loading from '@/components/UI/Loading'
import { useUser } from '@/hooks/useUser'
import {
  AmplifyAuthenticator,
  AmplifyContainer,
  AmplifySignUp
} from '@aws-amplify/ui-react'
import Alert from '@material-ui/lab/Alert'
import { useRouter } from 'next/router'
import * as React from 'react'

const SignUpPage = () => {
  const router = useRouter()
  const { user, isLoading, errorMessage, handleClearError } = useUser()
  const [displayedError, setDisplayedError] = React.useState('')

  React.useEffect(() => {
    if (errorMessage !== '') {
      if (/incorrect.*username.*password/i.test(errorMessage)) {
        setDisplayedError('Incorrect username or password')
      } else if (/username.*expression/i.test(errorMessage)) {
        setDisplayedError('Username may not contain spaces')
      } else {
        setDisplayedError(errorMessage.toString())
      }
    }
  }, [errorMessage])

  React.useEffect(() => {
    if (user) {
      router.push('/demo')
    }
  }, [user])

  return user ? null : (
    <>
      {isLoading && <Loading />}
      {displayedError !== '' && (
        <Alert severity='warning' onClose={handleClearError}>
          {displayedError}
        </Alert>
      )}
      <AWSTheme>
        <AmplifyContainer>
          <AmplifyAuthenticator usernameAlias='email' initialAuthState='signup'>
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

export default SignUpPage
