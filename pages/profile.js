import { H3, P } from 'mui/Typography'
import { Authenticate } from 'aws/Auth'
import useUser from 'hooks/useUser'
// import useForm from 'hooks/useForm'

const Profile = () => {
  const { loading, user } = useUser()
  // const initialValues = {

  // }
  // const {} = useForm(() => {

  // }, initialValues)
  // user ? console.log(user.attributes) : null
  return !loading && user ? (
    <>
      <H3>Profile</H3>
      <P>Hello {user.username}!</P>
      <P>Email: {user.attributes.email}</P>
      <P>Email Verified: {user.attributes.email_verified ? 'Yes' : 'No'}</P>
      <P>Subscription ID: {user.attributes['custom:subscription_id']}</P>
    </>
  ) : (
    <Authenticate />
  )
}

export default Profile