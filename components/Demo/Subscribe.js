import Grid from '@material-ui/core/Grid'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Checkout from 'components/Checkout'
import OrderSummary from 'components/OrderSummary'
import { Authenticate } from 'aws/Auth'
import useUser from 'hooks/useUser'

const Subscribe = ({ stripeKey }) => {
  const { loading, user } = useUser()
  const stripePromise = loadStripe(stripeKey);
  return !loading && user ? (
    <Grid container>
      <Grid item xs>
        <Elements stripe={stripePromise}>
          <Checkout />
        </Elements>
      </Grid>
      <Grid item xs>
        <OrderSummary />
      </Grid>
    </Grid>
  ) : (
    <Authenticate />
  )
}

export const getServerSideProps = async () => {
  return {
    props: { stripeKey: process.env.STRIPE_PUBLISHABLE_KEY }
  }
}

export default Subscribe;