import ChipLabel from '@/components/Simulation/Response/ChipLabel'
import { H6, P } from '@/mui/Typography'
import { strToWords, swapWords } from '@/utils/grammar'
import Box from '@material-ui/core/Box'
import Chip from '@material-ui/core/Chip'
import { makeStyles } from '@material-ui/core/styles'
import * as React from 'react'

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(1)
  },
  chipLabel: {
    display: 'flex',
    flexFlow: 'row no-wrap',
    alignItems: 'center'
  },
  card: {
    minWidth: 275
  },
  textField: {
    margin: theme.spacing(1)
  }
}))

const Instruction = ({ input, index, instruction, handleOutput }) => {
  const { method, replacements } = instruction
  const classes = useStyles()
  const [output, setOutput] = React.useState('')

  React.useEffect(() => {
    const rollingReplace = () => {
      // console.log('performing rolling replace...')
      let response = ''
      const words = strToWords(input)
      words.forEach((word, i) => {
        // Append all punctuation (i.e. not apostrophe, word, or space)
        if (word.match(/[^\'\w\s]/g)) {
          if (word !== '|||') {
            // Our delimeter
            response = `${response}${word}`
          }
        } else {
          let replace = word
          replacements.forEach((replacement) => {
            // Phrase Check
            if (replacement.find.includes(' ')) {
              const wordsOfPhrase = replacement.find.split(' ')
              let invalid = false
              for (let j = 0; j < wordsOfPhrase.length; j++) {
                if (wordsOfPhrase[j] !== words[i + j]) {
                  invalid = true
                }
              }
              if (!invalid) {
                replace = replacement.replace
                for (let k = 1; k < wordsOfPhrase.length; k++) {
                  words[i + k] = '|||' // mark next words as done
                }
              }
            } else if (word === replacement.find) {
              // Word Check
              replace = replacement.replace
            }
          })
          response = `${response} ${replace}`
        }
      })
      const finishedResponse = response.trim()
      // console.log('instructions', finishedResponse)
      setOutput(finishedResponse)
      handleOutput(finishedResponse, index)
    }

    const steppedReplace = () => {
      // let response
      const find = []
      const replace = []
      replacements.forEach((replacement) => {
        // response = replaceAll(response, replacement.find, replacement.replace)
        find.push(replacement.find)
        replace.push(replacement.replace)
      })
      const response = swapWords(input, find, replace)
      setOutput(response)
      // handleOutput(response)
    }

    if (input) {
      switch (method) {
        case 'rolling':
          rollingReplace()
          break
        case 'stepped':
          steppedReplace()
          break
        default:
          break
      }
    }
  }, [input])

  return (
    <Box
      border={1}
      borderRadius={8}
      marginTop={4}
      marginBottom={4}
      bgcolor='#efefef'
      padding={4}>
      <H6>Step {`${index + 2}`}: Rolling Replacement</H6>
      {method === 'word-replace' && (
        <P>
          The input is scanned word-by-word checking for a match to replace.
        </P>
      )}
      <P>
        Input: <strong style={{ color: '#a5a5a5' }}>{input}</strong>
      </P>
      {replacements.map(({ find, replace }) => (
        <Chip
          key={find}
          label={<ChipLabel find={find} replace={replace} />}
          className={classes.chip}
        />
      ))}
      {output && (
        <P>
          Output: <strong style={{ color: '#333' }}>{output}</strong>
        </P>
      )}
    </Box>
  )
}

export default Instruction
