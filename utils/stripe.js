import Stripe from 'stripe'

export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY_LIVE ?? process.env.STRIPE_SECRET_KEY,
  {
    apiVersion: '2020-08-27',
    appInfo: {
      name: 'Command Tactical Training Membership',
      version: '0.1.0'
    }
  }
)
