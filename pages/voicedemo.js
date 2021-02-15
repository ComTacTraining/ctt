import VoiceDemo from 'components/VoiceDemo'
import { withGuestAuth } from 'components/Auth/HOC'

const VoiceDemoPage = () => <VoiceDemo />

export default withGuestAuth(VoiceDemoPage)