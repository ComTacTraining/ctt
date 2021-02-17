const path = require('path')
const webpack = require('webpack')

module.exports = {
  webpack: (config) => {
    config.resolve.modules.push(path.resolve('./'))

    return config
  },
  target: 'serverless',
  env: {
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_PRICE_ID: process.env.STRIPE_PRICE_ID,
    TRANSCRIBE_ACCESS_ID: process.env.TRANSCRIBE_ACCESS_ID,
    TRANSCRIBE_SECRET_KEY: process.env.TRANSCRIBE_SECRET_KEY
  }
}
