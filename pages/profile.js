import Profile from 'components/Profile'
import { withMemberAuth } from 'components/Auth/HOC'

const ProfilePage = () => <Profile />

export default withMemberAuth(ProfilePage)