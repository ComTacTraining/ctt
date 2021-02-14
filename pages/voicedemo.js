import VoiceDemo from 'components/VoiceDemo'
import { withGuestAuth } from 'components/Auth/HOC'

const VoiceDemoPage = ({ accessId, secretKey}) => <VoiceDemo accessId={accessId} secretKey={secretKey} />

export const getServerSideProps = async () => {
    return {
        props: {accessId: process.env.AWS_ACCESS_ID, secretKey: process.env.AWS_SECRET_KEY}
    }
}
export default withGuestAuth(VoiceDemoPage)