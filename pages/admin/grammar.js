import Grammar from 'components/Admin/Grammar'
import { withAdminAuth } from 'components/Auth/HOC'

const GrammarPage = () => <Grammar />

export default withAdminAuth(GrammarPage)
