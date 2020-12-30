const path = require('path')
const webpack = require('webpack')

module.exports = {
  webpack: config => {
    config.resolve.modules.push(path.resolve('./'))

    return config
  }
}