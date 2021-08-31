import { withAdminAuth } from '@/components/Auth/HOC'
import Response from '@/components/Pages/Admin/Response'

const ResponsePage = () => <Response />

export default withAdminAuth(ResponsePage)
