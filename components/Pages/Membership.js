import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles } from '@material-ui/core/styles'
import { Auth } from 'aws-amplify'
import axios from 'axios'
import OrderSummary from 'components/Elements/OrderSummary'
import { useUser } from 'hooks/useUser'
import Button from 'mui/Button'
import { H4, H5, P } from 'mui/Typography'
import { useRouter } from 'next/router'
import * as React from 'react'
import { getStripe } from 'utils/stripe-client'

const useStyles = makeStyles({
  root: {
    maxWidth: 475
  },
  actions: {
    textAlign: 'center',
    margin: '0 auto'
  }
})

const Membership = () => {
  const classes = useStyles()
  const router = useRouter()
  const { user, isLoading } = useUser()
  const [error, setError] = React.useState('')
  const [customerId, setCustomerId] = React.useState('')

  const createStripeCustomer = async () => {
    try {
      const customerResponse = await axios.post('/api/stripe/customer', {
        email: user.attributes.email
      })
      const data = customerResponse.data
      if (data.customerId) {
        await Auth.updateUserAttributes(user, {
          'custom:stripecustomerid': data.customerId
        })
        setCustomerId(data.customerId)
      }
    } catch (error) {
      setError(error.message)
    }
  }

  React.useEffect(() => {
    if (!isLoading && user) {
      const cognitoCustomerId = user.attributes['custom:stripecustomerid']
      if (cognitoCustomerId && cognitoCustomerId !== '') {
        setCustomerId(cognitoCustomerId)
      } else {
        createStripeCustomer()
      }
    }
  }, [user, isLoading])

  const handleCheckout = async () => {
    try {
      const checkoutResponse = await axios.post('/api/stripe/checkout', {
        customerId
      })
      const data = checkoutResponse.data
      if (data.sessionId) {
        const stripe = await getStripe()
        stripe.redirectToCheckout({ sessionId: data.sessionId })
      }
    } catch (error) {
      setError(error)
    }
  }

  return (
    <>
      <H4>Membership</H4>
      {error !== '' && <P color='red'>{error}</P>}
      <P>
        You have completed the demo. By subscribing you will unlock thousands of
        unique training evolutions. Sign up and be able to customize your
        experience to match your own response system and receive the education
        and an evaluation on your performance. We guarantee if you use this
        program consistently you will become a better fireground commander.
      </P>
      <H5 gutterBottom>
        &ldquo;Train like your life depends on it, because it does! ...and be
        safe out there.&rdquo;
      </H5>
      <Box className={classes.plan} display='flex' justifyContent='center'>
        <Card className={classes.root}>
          <CardContent>
            <OrderSummary />
            {customerId && (
              <CardActions>
                <Button
                  className={classes.actions}
                  onClick={() => handleCheckout()}>
                  Checkout
                </Button>
              </CardActions>
            )}
          </CardContent>
        </Card>
      </Box>
    </>
  )
}

export default Membership
