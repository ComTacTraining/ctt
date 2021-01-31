import Subscribe from 'components/Subscribe'
import { withGuestAuth } from 'components/Auth/HOC'

const SubscribePage = ({ stripeKey }) => <Subscribe stripeKey={stripeKey} />

export const getServerSideProps = async () => {
  return {
    props: { stripeKey: process.env.STRIPE_PUBLISHABLE_KEY }
  }
}

export default withGuestAuth(SubscribePage)