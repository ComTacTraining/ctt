import { withAdminAuth } from '@/components/Auth/HOC'
import Evolutions from '@/components/Pages/Admin/Evolutions'

const EvolutionsPage = () => <Evolutions />

export default withAdminAuth(EvolutionsPage)
