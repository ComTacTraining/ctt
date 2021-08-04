import { setHeaders } from '@/utils/api-response'
import { stripe } from '@/utils/stripe'

const createStripeCustomer = async (req, res) => {
  const end = setHeaders(req, res)
  if (end) {
    return
  }
  if (req.method === 'POST') {
    const { email } = req.body
    if (!email) {
      res.status(400).json({ message: 'Missing params' })
    }
    try {
      const customer = await stripe.customers.create({
        email: email
      })
      res.status(200).json({ customerId: customer.id })
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
}

export default createStripeCustomer
