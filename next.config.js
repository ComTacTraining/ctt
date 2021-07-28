const path = require('path')
const webpack = require('webpack')

module.exports = {
  webpack: (config, options) => {
    const { isServer } = options
    config.resolve.modules.push(path.resolve('./'))
    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      exclude: config.exclude,
      use: [
        {
          loader: require.resolve('url-loader'),
          options: {
            limit: config.inlineImageLimit,
            fallback: require.resolve('file-loader'),
            publicPath: `${config.assetPrefix}/_next/static/images/`,
            outputPath: `${isServer ? '../' : ''}static/images/`,
            name: '[name]-[hash].[ext]',
            esModule: config.esModule || false
          }
        }
      ]
    })

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
