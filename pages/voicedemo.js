import VoiceDemo from 'components/VoiceDemo'
import { withGuestAuth } from 'components/Auth/HOC'

const DemoPage = () => <VoiceDemo />

export default withGuestAuth(DemoPage)