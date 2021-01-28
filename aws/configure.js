import Amplify from 'aws-amplify'
import Auth from '@aws-amplify/auth'
import Predictions, { AmazonAIPredictionsProvider } from '@aws-amplify/predictions'

import config from 'aws-exports'
Amplify.configure({
  config,
  ssr: true
})
// Amplify.register(Predictions)
// Amplify.addPluggable(new AmazonAIPredictionsProvider())
Auth.configure(config)
Predictions.configure(config)
Predictions.addPluggable(new AmazonAIPredictionsProvider())