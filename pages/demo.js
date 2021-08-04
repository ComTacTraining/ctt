import { withGuestAuth } from '@/components/Auth/HOC'
import Demo from '@/components/Pages/Demo'

const DemoPage = () => <Demo />

export default withGuestAuth(DemoPage)
