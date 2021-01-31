import Demo from 'components/Demo'
import { withGuestAuth } from 'components/Auth/HOC'

const DemoPage = () => <Demo />

export default withGuestAuth(DemoPage)