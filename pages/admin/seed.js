import Seed from 'components/Admin/Seed'
import { withAdminAuth } from 'components/Auth/HOC'

const SeedPage = () => <Seed />

export default withAdminAuth(SeedPage)
