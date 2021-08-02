import { withGuestAuth } from 'components/Auth/HOC'
import Membership from 'components/Pages/Membership'

const MembershipPage = () => <Membership />

export default withGuestAuth(MembershipPage)
