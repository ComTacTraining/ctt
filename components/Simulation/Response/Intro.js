import { H6, P } from '@/mui/Typography'
import Box from '@material-ui/core/Box'
import * as React from 'react'
import { split, Syntax } from 'sentence-splitter'

const Intro = ({
  command,
  ic,
  isAssigned,
  unit,
  group,
  handleIntroChange,
  handleRemainingChange
}) => {
  const [sentences, setSentences] = React.useState([])
  const [intro, setIntro] = React.useState(null)
  const [isAssignment, setIsAssignment] = React.useState(false)
  const [remaining, setRemaining] = React.useState(null)
  const [removed, setRemoved] = React.useState(null)

  const getSentences = (str) => {
    return split(str.toLowerCase())
      .filter((child) => child.type === Syntax.Sentence)
      .map((node) => node.raw.toUpperCase())
  }

  React.useEffect(() => {
    if (command) {
      const newSentences = getSentences(command)
      setSentences([...newSentences])
    }
  }, [command])

  React.useEffect(() => {
    const checkIntro = () => {
      if (!isAssigned && command.includes(unit) && command.includes(group)) {
        setIntro(`${ic} FROM ${unit}. I COPY I AM ${group} GROUP.`)
      } else if (
        isAssigned &&
        (command.includes(unit) || command.includes(group))
      ) {
        setIntro(`${ic} FROM ${group}.`)
      } else if (command.includes(unit)) {
        setIntro(`${ic} FROM ${unit}.`)
      } else {
        setIntro('')
      }
    }

    if (sentences && sentences.length > 0) {
      checkIntro()
    }
  }, [sentences])

  React.useEffect(() => {
    const isMatch = (str) => {
      return isAssignment && str.includes(unit) && str.includes(group)
        ? true
        : !isAssignment && str.includes(unit)
        ? true
        : false
    }

    if (intro !== null && intro !== '') {
      const one = sentences[0]
      const two = sentences.slice(0, 1).join(' ')
      let remainingStr
      if (isMatch(one)) {
        remainingStr = sentences.slice(1).join(' ')
        setRemaining(remainingStr)
        setRemoved(one)
      } else if (isMatch(two)) {
        remainingStr = sentences.slice(2).join(' ')
        setRemaining(remainingStr)
        setRemoved(two)
      }
      handleRemainingChange(remainingStr)
    } else {
      setRemaining(command)
    }
  }, [intro, isAssignment, sentences])

  React.useEffect(() => {
    if (remaining !== null) {
      handleIntroChange(intro)
    }
  }, [remaining, handleIntroChange])

  return (
    <Box
      border={1}
      borderRadius={8}
      marginTop={4}
      marginBottom={4}
      bgcolor='#efefef'
      padding={4}
      display='flex'
      flexDirection='column'
      justifyContent='space-between'>
      <H6>Step 1: Split and Replace Intro</H6>
      <P>
        Original: <strong style={{ color: '#a5a5a5' }}>{command}</strong>
      </P>
      {removed && (
        <P>
          Removed:{' '}
          <strong style={{ color: '#f00', textDecoration: 'line-through' }}>
            {removed}
          </strong>
        </P>
      )}
      {intro && (
        <P>
          Intro: <strong>{intro}</strong>
        </P>
      )}
      {remaining && (
        <P>
          Remaining Command:{' '}
          <strong style={{ color: '#333' }}>{remaining}</strong>
        </P>
      )}
    </Box>
  )
}

export default Intro
