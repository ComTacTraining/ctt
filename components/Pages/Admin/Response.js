import Combine from '@/components/Simulation/Response/Combine'
import Form from '@/components/Simulation/Response/Form'
import Instruction from '@/components/Simulation/Response/Instruction'
import Intro from '@/components/Simulation/Response/Intro'
import { H3 } from '@/mui/Typography'
import Container from '@material-ui/core/Container'
import * as React from 'react'

const initialInput =
  "ENGINE 2 FROM LUNA IC, YOU'RE GOING TO BE FIRE ATTACK GROUP. YOUR TACTICAL OBJECTIVES ARE FIRE ATTACK, PRIMARY SEARCH AND CHECKING FOR EXTENSION."
const initialUnit = 'ENGINE 2'
const initialGroup = 'FIRE ATTACK'
const initialIC = 'LUNA PARK IC'
const sampleInstructions = [
  {
    id: '1',
    method: 'rolling',
    replacements: [
      {
        find: 'I',
        replace: 'YOU'
      },
      {
        find: 'YOU',
        replace: 'ME'
      },
      {
        find: 'YOUR',
        replace: 'MY'
      },
      {
        find: 'YOU ARE',
        replace: 'I AM'
      },
      {
        find: `YOU'RE`,
        replace: `I'M`
      },
      {
        find: `I'M`,
        replace: `YOU'RE`
      }
    ]
  }
]

const Response = () => {
  const [input, setInput] = React.useState(initialInput)
  const [unit, setUnit] = React.useState(initialUnit)
  const [group, setGroup] = React.useState(initialGroup)
  const [ic, setIC] = React.useState(initialIC)
  const [isAssigned, setIsAssigned] = React.useState(false)
  const [intro, setIntro] = React.useState('')
  const [remainingCommand, setRemainingCommand] = React.useState('')
  const [remainingOutput, setRemainingOutput] = React.useState(null)
  const [finishedRemaining, setFinishedRemaining] = React.useState('')
  const [combinedResponse, setCombinedResponse] = React.useState('')
  const [instructions, setInstructions] = React.useState([])

  React.useEffect(() => {
    const getInstructions = async () => {
      // Use sample for now... replace w/ API
      const newInstructions = sampleInstructions
      const newArr = []
      for (let i = 0; i < newInstructions.length; i++) {
        newArr.push('')
      }
      setRemainingOutput(newArr)
      setInstructions(newInstructions)
    }
    getInstructions()
  }, [])

  React.useEffect(() => {
    setCombinedResponse(`${intro} ${finishedRemaining}`)
  }, [intro, finishedRemaining])

  React.useEffect(() => {
    const newRemainingOutput = []
    for (let i = 0; i < instructions.length; i++) {
      newRemainingOutput.push('')
    }
    setRemainingOutput(newRemainingOutput)
  }, [instructions])

  const handleInputChange = (e) => {
    setInput(e.target.value.toUpperCase().trim())
  }

  const handleUnitChange = (e) => {
    setUnit(e.target.value.toUpperCase().trim())
  }

  const handleGroupChange = (e) => {
    setGroup(e.target.value.toUpperCase().trim())
  }

  const handleICChange = (e) => {
    setIC(e.target.value.toUpperCase().trim())
  }

  const handleIsAssigned = (e) => {
    setIsAssigned(e.target.checked)
  }

  const handleIntroChange = (str) => {
    setIntro(str)
  }

  const handleRemainingChange = (str) => {
    setRemainingCommand(str)
  }

  const handleInstructionOutput = (output, index) => {
    const newRemaining = remainingOutput
    newRemaining[index] = output
    const lastIndex = newRemaining.length - 1
    setRemainingOutput(newRemaining)
    setFinishedRemaining(newRemaining[lastIndex])
  }

  return (
    <Container maxWidth='lg'>
      <Container maxWidth='md'>
        <H3 align='center'>Response System</H3>
      </Container>
      <Form
        initialInput={input}
        initialUnit={unit}
        initialGroup={group}
        initialIC={ic}
        output={combinedResponse}
        handleInputChange={(e) => handleInputChange(e)}
        handleUnitChange={(e) => handleUnitChange(e)}
        handleGroupChange={(e) => handleGroupChange(e)}
        handleICChange={(e) => handleICChange(e)}
        handleIsAssigned={(e) => handleIsAssigned(e)}
      />
      <Container maxWidth='md'>
        <Intro
          command={input}
          ic={ic}
          isAssigned={isAssigned}
          unit={unit}
          group={group}
          handleIntroChange={handleIntroChange}
          handleRemainingChange={handleRemainingChange}
        />
        {remainingCommand &&
          instructions.map((instruction, i) => {
            const instructionInput =
              i === 0 ? remainingCommand : remainingOutput[i]
            return (
              <Instruction
                key={i}
                index={i}
                input={instructionInput}
                instruction={instruction}
                handleOutput={(o, j) => {
                  handleInstructionOutput(o, j)
                }}
              />
            )
          })}
        <Combine
          step={instructions.length + 2}
          intro={intro}
          outro={finishedRemaining}
        />
      </Container>
    </Container>
  )
}

export default Response
