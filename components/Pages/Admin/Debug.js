import { H3, P } from '@/mui/Typography'
import * as React from 'react'

const Debug = () => {
  const { user, isMember, isAdmin } = useUser()

  return !user ? null : (
    <>
      <H3>Debug Cognito</H3>
      <P>Email: {user.attributes.email}</P>
      <P>Email Verified: {user.attributes.email_verified ? 'Yes' : 'No'}</P>
      <P>Subscription ID: {user.attributes['custom:stripesubscriptionid']}</P>
      <P>Username/ID: {user.username}</P>
      <P>
        Groups:{' '}
        {user.signInUserSession.idToken.payload['cognito:groups']
          ? user.signInUserSession.idToken.payload['cognito:groups'].map(
              (g) => `${g} `
            )
          : ''}
      </P>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      {isMember && <P>Member's Only</P>}
      {isAdmin && <P>Admin's Only</P>}
    </>
  )
}

export default Debug
