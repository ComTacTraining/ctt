import { withAdminAuth } from 'components/Auth/HOC'
import Grammar from 'components/Pages/Admin/Grammar'

const GrammarPage = () => <Grammar />

export default withAdminAuth(GrammarPage)
