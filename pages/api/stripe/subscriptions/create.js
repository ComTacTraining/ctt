import Stripe from 'stripe'
import { setHeaders } from 'utils/api-response'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async (req, res) => {
  const end = setHeaders(req, res)
  if (end) {
    return
  }
  if (req.method === 'POST') {
    const { customerId } = req.body
    if (!customerId) {
      res.status(400).json({ message: 'Missing params' })
    }
    try {
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ plan: process.env.STRIPE_PRICE_ID }],
        expand: ['latest_invoice.payment_intent']
      })
      if (subscription) {
        res.status(200).json(
          JSON.stringify({
            id: subscription.id,
            clientSecret:
              subscription.latest_invoice.payment_intent.client_secret,
            status: subscription.latest_invoice.payment_intent.status
          })
        )
      } else {
        res.status(401).json({ message: 'No subscription returned' })
      }
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
}
