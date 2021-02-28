import * as React from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { Contained } from 'mui/Button'
import useForm from 'hooks/useForm'
import { H4, P } from 'mui/Typography'
import { UserContext } from 'components/Auth/UserContext'
import Loading from 'components/Loading'
import Link from 'components/Link'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
    // '& .MuiFormControl-root': {
    //   margin: theme.spacing(1),
    //   maxWidth: '100%'
    // }
  },
  btn: {
    maxWidth: '10rem',
    textAlign: 'center',
    margin: `${theme.spacing(2)}px auto`
  },
  error: {
    color: theme.palette.error.main
  },
  success: {
    color: theme.palette.success.main
  }
}))

const Checkout = (props) => {
  const classes = useStyles()
  const stripe = useStripe()
  const elements = useElements()
  const [success, setSuccess] = React.useState(false)
  const [error, setError] = React.useState('')
  const { user, handleSubscription } = React.useContext(UserContext)

  const initialFormFields = {
    cardName: '',
    address: '',
    city: '',
    state: '',
    email: '',
    phone: ''
  }
  const { values, handleChange, updateValue, handleSubmit } = useForm(
    async () => {
      const result = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
        billing_details: {
          address: {
            city: values.city,
            line1: values.address,
            state: values.state
          },
          email: values.email,
          name: values.cardName,
          phone: values.phone
        }
      })
      const paymentMethod = result.paymentMethod
      if (result.error) {
        setError(result.error.message)
      } else {
        await createStripeCustomer({
          paymentMethodId: paymentMethod.id,
          email: values.email
        })
      }
    },
    initialFormFields
  )

  const createStripeCustomer = async ({ paymentMethodId, email }) => {
    try {
      const customerResponse = await axios.post(
        '/api/stripe/customers/create',
        {
          paymentMethodId: paymentMethodId,
          email: email
        }
      )
      const customer = customerResponse.data
      if (customer.id) {
        createStripeSubscription(customer.id)
      }
    } catch (error) {
      setError(error.message)
    }
  }

  const createStripeSubscription = async (customerId) => {
    try {
      const subscriptionResponse = await axios.post(
        '/api/stripe/subscriptions/create',
        {
          customerId: customerId
        }
      )
      const subscription = subscriptionResponse.data
      const done = subscription.status !== 'requires_action' ? true : false
      if (!done && subscription.clientSecret) {
        const confirmed = await confirmCardPayment(subscription.clientSecret)
        if (confirmed) {
          await handleSubscription({
            customerId,
            subscriptionId: subscription.id
          })
          setSuccess(true)
        }
      }
      if (done) {
        await handleSubscription({
          customerId,
          subscriptionId: subscription.id
        })
        setSuccess(true)
      }
    } catch (error) {
      setError(error.message)
    }
  }

  const confirmCardPayment = async (clientSecret) => {
    const result = await stripe.confirmCardPayment(clientSecret)
    if (!result.error) {
      return true
    }
    setError(result.error.message)
    return false
  }

  React.useEffect(() => {
    if (user) {
      updateValue({ key: 'email', val: user.attributes.email })
    }
  }, [user])

  return (
    <>
      {success ? (
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <H4 className={classes.success}>Thank you for your membership!</H4>
            <Link href='/profile'>Visit your profile</Link>
          </Grid>
        </Grid>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className={classes.root}>
            <Grid container spacing={1}>
              {error && (
                <Grid item xs={12}>
                  <P className={classes.error}>{error}</P>
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  id='cardName'
                  name='cardName'
                  label='Name on card'
                  variant='outlined'
                  fullWidth
                  onChange={handleChange}
                  value={values.cardName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id='address'
                  name='address'
                  label='Address'
                  variant='outlined'
                  fullWidth
                  onChange={handleChange}
                  value={values.address}
                />
              </Grid>
              <Grid item xs={9}>
                <TextField
                  id='city'
                  name='city'
                  label='City'
                  variant='outlined'
                  fullWidth
                  onChange={handleChange}
                  value={values.city}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id='state'
                  name='state'
                  label='State'
                  variant='outlined'
                  fullWidth
                  onChange={handleChange}
                  value={values.state}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id='email'
                  name='email'
                  label='Email'
                  variant='outlined'
                  fullWidth
                  disabled
                  value={values.email}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id='phone'
                  name='phone'
                  label='Phone #'
                  variant='outlined'
                  fullWidth
                  onChange={handleChange}
                  value={values.phone}
                />
              </Grid>
              <Grid item xs={12}>
                <CardElement />
              </Grid>
              <Grid item xs={12}>
                <Contained
                  type='submit'
                  color='primary'
                  disabled={!stripe || !user}
                  className={classes.btn}>
                  Submit
                </Contained>
              </Grid>
            </Grid>
          </div>
        </form>
      )}
    </>
  )
}
export default Checkout
