// import { Auth } from 'aws-amplify'
import Grid from '@material-ui/core/Grid'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Checkout from 'components/Checkout'
import OrderSummary from 'components/OrderSummary'
import * as React from 'react'

const Subscribe = ({ stripeKey }) => {
  const [stripePromise, setStripePromise] = React.useState(() => loadStripe(stripeKey))
  
  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <Elements stripe={stripePromise}>
          <Checkout />
        </Elements>
      </Grid>
      <Grid item xs={12} sm={6}>
        <OrderSummary />
      </Grid>
    </Grid>
  ) 
}

export default Subscribe;