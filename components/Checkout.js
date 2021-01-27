import * as React from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { Contained } from 'mui/Button'
import useForm from 'hooks/useForm'
import useUser from 'hooks/useUser'
import { H4, P } from 'mui/Typography'
import { UserContext } from 'components/Auth/UserContext'
import Loading from 'components/Loading'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
}));

const Checkout = props => {
  const classes =  useStyles()
  const stripe = useStripe()
  const elements = useElements()
  const [success, setSuccess] = React.useState(false)
  const [error, setError] = React.useState('')
  const { user, isLoading }  = React.useContext(UserContext)

  const initialFormFields = {
    cardName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    email: user.attributes['email'],
    phone: '' 
  }
  const { values, handleChange, handleSubmit } = useForm(async () => {
    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        address: {
          city: values.city,
          line1: values.address,
          postal_code: values.zip,
          state: values.state
        },
        email: values.email,
        name: values.cardName,
        phone: values.phone
      }
    })
    await handleStripePaymentMethod(result)
  }, initialFormFields)

  const handleStripePaymentMethod = async result => {
    if (result.error) {
      setError(result.error.message)
    } else {
      const response = await fetch("api/member/create", {
        method: "POST",
        mode: "same-origin",
        body: JSON.stringify({
          paymentMethodId: result.paymentMethod.id
        })
      })

      const subscription = await response.json()
      handleSubscription(subscription)
    }
  };

  const handleSubscription = subscription => {

    try {
      const { client_secret, status } = subscription.latest_invoice.payment_intent

      if (status === "requires_action") {
        stripe.confirmCardPayment(client_secret).then(function(result) {
          if (result.error) {
            // The card was declined (i.e. insufficient funds, card has expired, etc)
            setError(result.error.message)
          } else {
            // Success!
            setSuccess(true)
          }
        });
      } else {
        // No additional information was needed
        setSuccess(true)
      }
    } catch (error) {
      console.log(`handleSubscription:: No payment information received!`. error)
    }
  }

  return (
    <>
      {success ? (
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <H4 className={classes.success}>Thank you for your membership!</H4>
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
                <TextField id="cardName" name="cardName" label="Name on card" variant="outlined" fullWidth onChange={handleChange} value={values.cardName} />
              </Grid>
              <Grid item xs={12}>
                <TextField id="address" name="address" label="Address" variant="outlined" fullWidth onChange={handleChange} value={values.address} />
              </Grid>
              <Grid item xs={6}>
                <TextField id="city" name="city" label="City" variant="outlined" fullWidth onChange={handleChange} value={values.city} />
              </Grid>
              <Grid item xs={2}>
                <TextField id="state" name="state" label="State" variant="outlined" fullWidth onChange={handleChange} value={values.state} />
              </Grid>
              <Grid item xs={4}>
                <TextField id="zip" name="zip" label="Zipcode" variant="outlined" fullWidth onChange={handleChange} value={values.zipcode} />
              </Grid>
              <Grid item xs={6}>
                <TextField id="email" name="email" label="Email" variant="outlined" fullWidth disabled value={values.email} />
              </Grid>
              <Grid item xs={6}>
                <TextField id="phone" name="phone" label="Phone #" variant="outlined" fullWidth onChange={handleChange} value={values.phone} />
              </Grid>
              <Grid item xs={12}>
                <CardElement />
              </Grid>
              <Grid item xs={12}>
                <Contained type="submit" color="primary" disabled={!stripe||!user} className={classes.btn}>
                  Submit
                </Contained>
              </Grid>
            </Grid>
          </div>
        </form>
      )}
    </>
  );
};
export default Checkout;