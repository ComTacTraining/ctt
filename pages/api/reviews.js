import { API } from 'aws-amplify'
// import { listReviews } from 'graphql/queries'

export default async (_, res) => {
  res.json({ reviews: 'Reviews' })
  // try {
  //   const { data } = await API.graphql({ query: listReviews })
  //   res.json({ posts: data.listReviews.items })
  // } catch (err) {
  //   res.json({ error: true })
  // }
}