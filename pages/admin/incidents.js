import Incidents from 'components/Admin/Incidents'
import { withAdminAuth } from 'components/Auth/HOC'

const IncidentsPage = () => <Incidents />

export default withAdminAuth(IncidentsPage)
