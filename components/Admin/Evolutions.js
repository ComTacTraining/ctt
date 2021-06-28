import * as React from 'react'
import { Auth, API } from 'aws-amplify'
import { listEvolutions } from 'graphql/queries'
import { createEvolution } from 'graphql/mutations'
import { evolutions as evolutionFixtures } from 'fixtures/evolutions'
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

const Evolutions = () => {
  const [loading, setLoading] = React.useState(true)
  const [seeding, setSeeding] = React.useState(false)
  const [evolutions, setEvolutions] = React.useState([])
  const [sortedEvolutions, setSortedEvolutions] = React.useState([])
  const [token, setToken] = React.useState(null)

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const { data } = await API.graphql({
          query: listEvolutions,
          variables: { limit: 100, nextToken: token }
        })
        setEvolutions([...evolutions, ...data.listEvolutions.items])
        if (data.listEvolutions.nextToken) {
          setToken(data.listEvolutions.nextToken)
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
    if (evolutions && !loading) {
      const sorted = evolutions.sort((a, b) =>
        a.category > b.category
          ? 1
          : a.category < b.category
          ? -1
          : a.number < b.number
          ? -1
          : 1
      )
      setSortedEvolutions(sorted)
    }
  }, [evolutions, loading])

  const handleSeed = async () => {
    setSeeding(true)
    try {
      await Auth.currentAuthenticatedUser()
      // 523 evolutions
      await Promise.all(
        evolutionFixtures.map(async (evolutionData) => {
          const { id, ...evolution } = evolutionData
          await API.graphql({
            query: createEvolution,
            variables: { input: evolution },
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
      <H3>Evolutions</H3>
      {loading ? (
        <P>Loading Evolutions...</P>
      ) : (
        <>
          {sortedEvolutions.length ? (
            <>
              <TableContainer component={Paper}>
                <Table aria-label='evolutions'>
                  <TableHead>
                    <TableRow>
                      <TableCell>id</TableCell>
                      <TableCell align='right'>category</TableCell>
                      <TableCell align='right'>number</TableCell>
                      <TableCell align='right'>conditions</TableCell>
                      <TableCell align='right'>construction</TableCell>
                      <TableCell align='right'>entryEgress</TableCell>
                      <TableCell align='right'>exhaust</TableCell>
                      <TableCell align='right'>fire</TableCell>
                      <TableCell align='right'>flow</TableCell>
                      <TableCell align='right'>occupancy</TableCell>
                      <TableCell align='right'>placement</TableCell>
                      <TableCell align='right'>side</TableCell>
                      <TableCell align='right'>size</TableCell>
                      <TableCell align='right'>smoke</TableCell>
                      <TableCell align='right'>stories</TableCell>
                      <TableCell align='right'>street</TableCell>
                      <TableCell align='right'>survivability</TableCell>
                      <TableCell align='right'>withstanding</TableCell>
                      <TableCell align='right'>attack</TableCell>
                      <TableCell align='right'>ventilation</TableCell>
                      <TableCell align='right'>exposure</TableCell>
                      <TableCell align='right'>ric</TableCell>
                      <TableCell align='right'>medical</TableCell>
                      <TableCell align='right'>createdAt</TableCell>
                      <TableCell align='right'>updatedAt</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedEvolutions.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell component='th' scope='row'>
                          {row.id}
                        </TableCell>

                        <TableCell align='right'>{row.category}</TableCell>
                        <TableCell align='right'>{row.number}</TableCell>
                        <TableCell align='right'>{row.conditions}</TableCell>
                        <TableCell align='right'>
                          {row.construction.join(', ')}
                        </TableCell>
                        <TableCell align='right'>
                          {row.entryEgress.join(', ')}
                        </TableCell>
                        <TableCell align='right'>{row.exhaust}</TableCell>
                        <TableCell align='right'>{row.fire}</TableCell>
                        <TableCell align='right'>{row.flow}</TableCell>

                        <TableCell align='right'>{row.occupancy}</TableCell>
                        <TableCell align='right'>{row.placement}</TableCell>
                        <TableCell align='right'>{row.side}</TableCell>
                        <TableCell align='right'>{row.size}</TableCell>
                        <TableCell align='right'>{row.smoke}</TableCell>
                        <TableCell align='right'>{row.stories}</TableCell>
                        <TableCell align='right'>{row.street}</TableCell>
                        <TableCell align='right'>{row.survivability}</TableCell>
                        <TableCell align='right'>
                          {row.withstanding ? 'Yes' : 'No'}
                        </TableCell>
                        <TableCell align='right'>
                          {row.attack ? 'Yes' : 'No'}
                        </TableCell>
                        <TableCell align='right'>
                          {row.ventilation ? 'Yes' : 'No'}
                        </TableCell>
                        <TableCell align='right'>
                          {row.exposure ? 'Yes' : 'No'}
                        </TableCell>
                        <TableCell align='right'>
                          {row.ric ? 'Yes' : 'No'}
                        </TableCell>
                        <TableCell align='right'>
                          {row.medical ? 'Yes' : 'No'}
                        </TableCell>
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
                Unable to load evolutions. Click the button below to Seed the
                original evolutions.
              </P>
              <Contained onClick={handleSeed}>
                {seeding ? 'Seeding...' : 'Seed Evolutions'}
              </Contained>
            </>
          )}
        </>
      )}
    </>
  )
}

export default Evolutions
