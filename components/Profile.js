import * as React from 'react'
import { UserContext } from 'components/Auth/UserContext'
import { H3, P } from 'mui/Typography'

const Profile = () => {
  const { user } = React.useContext(UserContext)

  return !user ? null : (
    <>
      <H3>Profile</H3>
      <P>Todo: Add custom alarms</P>
      <P>Todo: Add custom dispatch center</P>
      <P>Todo: Add tips default</P>
    </>
  )
}

export default Profile
