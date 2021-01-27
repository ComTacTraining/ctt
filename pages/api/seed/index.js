import { withSSRContext } from 'aws-amplify'

export default async (req, res) => {
  const { API } = withSSRContext({ req })
  
}