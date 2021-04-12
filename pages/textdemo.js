import TextDemo from 'components/TextDemo'
import { withAdminAuth } from 'components/Auth/HOC'

const TextDemoPage = () => <TextDemo />

export default withAdminAuth(TextDemoPage)
