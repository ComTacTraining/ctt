import { withMemberAuth } from '@/components/Auth/HOC'
import Profile from '@/components/Profile/Profile'

const ProfilePage = () => <Profile />

export default withMemberAuth(ProfilePage)
