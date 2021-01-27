import { withSSRContext } from 'aws-amplify'
// import { commentsByReviewId } from 'graphql/queries'

export default async (req, res) => {
  const { query: { postId }} = req;
  res.json({ postId })
  // const { API } = withSSRContext({ req })
  // const { query: { postId }} = req;
  // try {
  //   const { data } = await API.graphql({ 
  //     query: commentsByReviewId, 
  //     variables: { postId },
  //     authMode: 'AMAZON_COGNITO_USER_POOLS'
  //   })
  //   res.json({ comments: data.commentsByReviewId.items })
  // } catch (err) {
  //   res.statusCode = 403
  //   res.json({ error: true })
  // }
}