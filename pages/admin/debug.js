import { withAdminAuth } from '@/components/Auth/HOC'
import Debug from '@/components/Pages/Admin/Debug'

const DebugPage = () => <Debug />

export default withAdminAuth(DebugPage)
