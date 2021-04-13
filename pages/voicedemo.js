import VoiceDemo from 'components/VoiceDemo'
import { withAdminAuth } from 'components/Auth/HOC'

const VoiceDemoPage = ({ accessId, secretKey }) => (
  <VoiceDemo accessId={accessId} secretKey={secretKey} />
)

export const getServerSideProps = async () => {
  return {
    props: {
      accessId: process.env.TRANSCRIBE_ACCESS_ID,
      secretKey: process.env.TRANSCRIBE_SECRET_KEY
    }
  }
}
export default withAdminAuth(VoiceDemoPage)
