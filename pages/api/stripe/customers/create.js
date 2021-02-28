import Stripe from 'stripe'
import { setHeaders } from 'utils/api-response'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async (req, res) => {
  const end = setHeaders(req, res)
  if (end) {
    return
  }
  if (req.method === 'POST') {
    const { paymentMethodId, email } = req.body
    if (!paymentMethodId || !email) {
      res.status(400).json({ message: 'Missing params' })
    }
    try {
      const customer = await stripe.customers.create({
        payment_method: paymentMethodId,
        email: email,
        invoice_settings: {
          default_payment_method: paymentMethodId
        }
      })
      res.status(200).json(
        JSON.stringify({
          id: customer.id
        })
      )
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
}
