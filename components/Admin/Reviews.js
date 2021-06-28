import * as React from 'react'
import { API } from 'aws-amplify'
import { listReviews } from 'graphql/queries'
import { H3, P } from 'mui/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const Reviews = () => {
  const [loading, setLoading] = React.useState(true)
  const [reviews, setReviews] = React.useState([])
  const [sortedReviews, setSortedReviews] = React.useState([])
  const [token, setToken] = React.useState(null)

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const { data } = await API.graphql({
          query: listReviews,
          variables: { limit: 100, nextToken: token }
        })
        setReviews([...reviews, ...data.listReviews.items])
        if (data.listReviews.nextToken) {
          setToken(data.listReviews.nextToken)
        } else {
          setLoading(false)
          setToken(null)
        }
      } catch (e) {
        console.log(e)
      }
    }
    if (loading) {
      loadData()
    }
  }, [loading, token])

  React.useEffect(() => {
    if (reviews && !loading) {
      const sorted = reviews.sort((a, b) =>
        a.autoScore > b.autoScore
          ? 1
          : a.selfScore < b.selfScore
          ? -1
          : a.owner < b.owner
          ? -1
          : 1
      )
      setSortedReviews(sorted)
    }
  }, [reviews, loading])

  const codeFromCategory = (cat) => {
    switch (cat) {
      case 'COMMERCIALLEGACY':
        return 'cl'
      case 'COMMERCIALMODERN':
        return 'cm'
      case 'INDUSTRIALLEGACY':
        return 'il'
      case 'INDUSTRIALMODERN':
        return 'im'
      case 'MULTIFAMILYLEGACY':
        return 'mfl'
      case 'MULTIFAMILYMODERN':
        return 'mfm'
      case 'SINGLEFAMILYLEGACY':
        return 'sfl'
      case 'SINGLEFAMILYMODERN':
        return 'sfm'
    }
  }

  return (
    <>
      <H3>Reviews</H3>
      {loading ? (
        <P>Loading Reviews...</P>
      ) : (
        <>
          {sortedReviews.length ? (
            <>
              <TableContainer component={Paper}>
                <Table aria-label='evolutions'>
                  <TableHead>
                    <TableRow>
                      <TableCell>id</TableCell>
                      <TableCell align='right'>auto score</TableCell>
                      <TableCell align='right'>self score</TableCell>
                      <TableCell align='right'>member</TableCell>
                      <TableCell align='right'>evolution</TableCell>
                      <TableCell align='right'>createdAt</TableCell>
                      <TableCell align='right'>updatedAt</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedReviews.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell component='th' scope='row'>
                          {row.id}
                        </TableCell>
                        <TableCell align='right'>{row.autoScore}</TableCell>
                        <TableCell align='right'>{row.selfScore}</TableCell>
                        <TableCell align='right'>{row.owner}</TableCell>
                        <TableCell align='right'>{`${codeFromCategory(
                          row.Evolution.category
                        )}${row.Evolution.number}`}</TableCell>
                        <TableCell align='right'>{row.createdAt}</TableCell>
                        <TableCell align='right'>{row.updatedAt}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : (
            <>
              <P>Unable to load reviews.</P>
            </>
          )}
        </>
      )}
    </>
  )
}

export default Reviews
