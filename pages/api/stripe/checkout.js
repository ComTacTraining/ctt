import { setHeaders } from '@/utils/api-response'
import { getURL } from '@/utils/helpers'
import { stripe } from '@/utils/stripe'

const priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID

const stripeCheckoutSession = async (req, res) => {
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
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        billing_address_collection: 'required',
        customer: customerId,
        line_items: [
          {
            price: priceId,
            quantity: 1
          }
        ],
        mode: 'subscription',
        allow_promotion_codes: true,
        success_url: `${getURL()}/profile`,
        cancel_url: `${getURL()}/membership`
      })
      res.status(200).json({ sessionId: session.id })
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
}

export default stripeCheckoutSession
