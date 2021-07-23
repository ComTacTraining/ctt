import * as React from 'react'
import { Auth, API } from 'aws-amplify'
import { listIncidents } from 'graphql/queries'
import { createIncident } from 'graphql/mutations'
import { incidents as incidentFixtures } from 'fixtures/incidents'
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
// import { UserContext } from 'components/Auth/UserContext'
import { Contained } from 'mui/Button'
import { H3, P } from 'mui/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const Incidents = () => {
  const [loading, setLoading] = React.useState(true)
  const [seeding, setSeeding] = React.useState(false)
  const [incidents, setIncidents] = React.useState([])
  const [sortedIncidents, setSortedIncidents] = React.useState([])
  const [token, setToken] = React.useState(null)

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const { data } = await API.graphql({
          query: listIncidents,
          variables: { limit: 100, nextToken: token }
        })
        setIncidents([...incidents, ...data.listIncidents.items])
        if (data.listIncidents.nextToken) {
          setToken(data.listIncidents.nextToken)
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
    if (incidents && !loading) {
      const sorted = incidents.sort((a, b) =>
        a.icsNims > b.icsNims
          ? 1
          : a.icsNims < b.icsNims
          ? -1
          : a.title < b.title
          ? -1
          : 1
      )
      setSortedIncidents(sorted)
    }
  }, [incidents, loading])

  const handleSeed = async () => {
    setSeeding(true)
    try {
      await Auth.currentAuthenticatedUser()
      // 50 incidents
      await Promise.all(
        incidentFixtures.map(async (incidentData) => {
          const { id, ...incident } = incidentData
          await API.graphql({
            query: createIncident,
            variables: { input: incident },
            authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
          })
        })
      )
      setSeeding(false)
      setLoading(true)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <H3>Incidents</H3>
      {loading ? (
        <P>Loading Incidents...</P>
      ) : (
        <>
          {sortedIncidents.length ? (
            <>
              <TableContainer component={Paper}>
                <Table aria-label='incidents'>
                  <TableHead>
                    <TableRow>
                      <TableCell>id</TableCell>
                      <TableCell align='right'>title</TableCell>
                      <TableCell align='right'>icsNims</TableCell>
                      <TableCell align='right'>command</TableCell>
                      <TableCell align='right'>createdAt</TableCell>
                      <TableCell align='right'>updatedAt</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedIncidents.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell component='th' scope='row'>
                          {row.id}
                        </TableCell>
                        <TableCell align='right'>{row.title}</TableCell>
                        <TableCell align='right'>{row.icsNims}</TableCell>
                        <TableCell align='right'>{row.command}</TableCell>
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
              <P>
                Unable to load incidents. Click the button below to Seed the
                original incidents.
              </P>
              <Contained onClick={handleSeed}>
                {seeding ? 'Seeding...' : 'Seed Incidents'}
              </Contained>
            </>
          )}
        </>
      )}
    </>
  )
}

export default Incidents
