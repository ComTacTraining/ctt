import Evolutions from 'components/Admin/Evolutions'
import { withAdminAuth } from 'components/Auth/HOC'

const EvolutionsPage = () => <Evolutions />

export default withAdminAuth(EvolutionsPage)
