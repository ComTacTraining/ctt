import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import MUITextField from '@material-ui/core/TextField'
import { H3 } from 'mui/Typography'
import * as React from 'react'
import { strReplace } from 'utils/ai'

const Grammar = () => {
  const [sampleCommand, setSampleCommand] = React.useState('You are fire attack group. I want you to take the hose...')
  const [sampleResponse, setSampleResponse] = React.useState('')
  const [replacements, setReplacements] = React.useState([
    [
      { find: ' i ', replace: ' you ' },
      { find: 'you are', replace: 'i am' },
      { find: 'your', replace: 'my' },
      { find: `you're`, replace: `i'm` },
      { find: `i'm`, replace: `you're` }
    ],
    [
      { find: 'you', replace: 'me' },
    ]
  ])

  React.useEffect(() => {
    const replace = async () => {
      const firstCharUpper = (s) => s.charAt(0).toUpperCase() + s.slice(1)

      let cmd = sampleCommand.toLowerCase().trim()
      await replacements.map(s => {
        const f = s.map(i => i.find)
        const r = s.map(i => i.replace)
        cmd = strReplace(cmd, f, r)
      })
      cmd.charAt(0).toUpperCase() + cmd.slice(1)
      const capitalized = cmd.split('. ').map(sentence => firstCharUpper(sentence)).join('. ')
      setSampleResponse(capitalized)
    }
    
    if (sampleCommand) {
      replace()
    }
  }, [sampleCommand])

  const handleSampleChange = () => {

  }

  return (
    <>
      <H3>Grammar</H3>
      <MUITextField
        fullWidth={true}
        id='match'
        label='Match'
        value={sampleCommand}
        onChange={handleSampleChange}
      />
      <MUITextField
        fullWidth={true}
        id='response'
        label='Response'
        value={sampleResponse}
        disabled={true}
      />
      {replacements.map(replacementSet => (
        <TableContainer component={Paper}>
          <Table aria-label='evolutions'>
            <TableHead>
              <TableRow>
                <TableCell>Find</TableCell>
                <TableCell align='right'>Replace</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {replacementSet.map((replacement) => (
                <TableRow key={replacement.find}>
                  <TableCell component='th' scope='row'>
                    {replacement.find}
                  </TableCell>
                  <TableCell align='right'>{replacement.replace}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ))}
    </>
  )
}

export default Grammar
