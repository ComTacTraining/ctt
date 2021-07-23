import { withGuestAuth } from 'components/Auth/HOC'
import Subscribe from 'components/Pages/Subscribe'

const SubscribePage = ({ stripeKey }) => <Subscribe stripeKey={stripeKey} />

export const getServerSideProps = async () => {
  return {
    props: { stripeKey: process.env.STRIPE_PUBLISHABLE_KEY }
  }
}

export default withGuestAuth(SubscribePage)