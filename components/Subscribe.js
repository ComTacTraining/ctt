import Grid from '@material-ui/core/Grid'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Checkout from 'components/Checkout'
import OrderSummary from 'components/OrderSummary'
import * as React from 'react'
import { H4, H5, P } from 'mui/Typography'
import Image from 'next/image'

const Subscribe = ({ stripeKey }) => {
  const [stripePromise, setStripePromise] = React.useState(() =>
    loadStripe(stripeKey)
  )

  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <H4>Become a Member</H4>
        <P>
          You have completed the demo. By subscribing you will unlock thousands
          of unique training evolutions. Sign up and be able to customize your
          experience to match your own response system and receive the education
          and an evaluation on your performance. We guarantee if you use this
          program consistently you will become a better fireground commander.
        </P>
        <H5 gutterBottom>
          &ldquo;Train like your life depends on it, because it does and be safe
          out there.&rdquo;
        </H5>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Image src='/aerial.jpg' width={800} height={474} />
      </Grid>
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

export default Subscribe
