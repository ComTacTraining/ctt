import Debug from 'components/Admin/Debug'
import { withAdminAuth } from 'components/Auth/HOC'

const DebugPage = () => <Debug />

export default withAdminAuth(DebugPage)
