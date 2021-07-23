import { withAdminAuth } from 'components/Auth/HOC'
import Incidents from 'components/Pages/Admin/Incidents'

const IncidentsPage = () => <Incidents />

export default withAdminAuth(IncidentsPage)
