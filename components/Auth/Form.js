import * as React from 'react'
import { AmplifyAuthenticator, AmplifySignUp } from '@aws-amplify/ui-react'
import { UserContext } from './UserContext'

const Form = () => {
    const { user, errorMessage, handleClearError }  = React.useContext(UserContext)
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
    
    return !user ? null : (
        <>
            {displayedError !== '' && (
                <Alert severity='warning' onClose={handleClearError}>
                {displayedError}
                </Alert>
            )}
            <Styles>
                <AmplifyContainer>
                <AmplifyAuthenticator usernameAlias="email" initialAuthState='signin'>
                    <AmplifySignIn slot="sign-in" usernameAlias="email" headerText="Sign in to your account"></AmplifySignIn>
                    <AmplifySignUp slot="sign-up" usernameAlias="email" headerText="Sign up for a free demo" formFields={[
                    { type: "email" },
                    { type: "password" },
                    { type: "custom:referral", label: "How did you hear about us?", required: false  }
                    ]}></AmplifySignUp>
                </AmplifyAuthenticator> 
                </AmplifyContainer>
            </Styles>
        </>
    )
}

export default Form