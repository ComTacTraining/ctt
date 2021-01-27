import { withSSRContext } from 'aws-amplify';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async (req, res) => {
  if (req.method === "POST") {
    const { Auth } = withSSRContext({ req })
    const { 
      paymentMethodId,
      // phone
    } = JSON.parse(req.body)
    try {
      const user = await Auth.currentAuthenticatedUser()
      const customer = await stripe.customers.create({
        payment_method: paymentMethodId,
        // phone: phone,
        email: user.attributes.email,
        invoice_settings: {
          default_payment_method: paymentMethodId
        }
      })
      // console.log(
      //   `create-customer:: Successfully created customer: ${JSON.stringify(
      //     customer
      //   )}`
      // )
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ plan: process.env.STRIPE_PRICE_ID }],
        expand: ["latest_invoice.payment_intent"]
      })
      // console.log(
      //   `create-customer:: Successfully created subscription: ${JSON.stringify(
      //     subscription
      //   )}`
      // )
      await Auth.updateUserAttributes(user, {
        'custom:stripecustomerid': customer.id,
        'custom:stripesubscriptionid': subscription.id,
        'custom:expired': '0'
      })
      res.status(200).json({
        customer_id: customer.id,
        subscription_id: subscription.id
      })
    } catch (e) {
      console.log(`create-customer:: Error: ${e.message}`)
      res.status(500).json({ statusCode: 500, message: e.message })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
};