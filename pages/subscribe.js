import Subscribe from 'components/Subscribe'

const SubscribePage = ({ stripeKey }) => <Subscribe stripeKey={stripeKey} />

export const getServerSideProps = async () => {
  return {
    props: { stripeKey: process.env.STRIPE_PUBLISHABLE_KEY }
  }
}

export default SubscribePage