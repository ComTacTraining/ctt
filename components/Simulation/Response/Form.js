import { H5 } from '@/mui/Typography'
import Box from '@material-ui/core/Box'
import Checkbox from '@material-ui/core/Checkbox'
import Divider from '@material-ui/core/Divider'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { makeStyles } from '@material-ui/core/styles'
import MUITextField from '@material-ui/core/TextField'
import * as React from 'react'

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: theme.spacing(1)
  },
  textFieldResponse: {
    margin: theme.spacing(1),
    backgroundColor: '#e5f2e5',
    '& .MuiInputBase-input.Mui-disabled': {
      color: '#000000'
    }
  },
  textContainer: {
    width: '40%'
  }
}))

const Form = ({
  initialInput,
  initialUnit,
  initialGroup,
  initialIC,
  output,
  handleInputChange,
  handleUnitChange,
  handleGroupChange,
  handleICChange,
  handleIsAssigned
}) => {
  const classes = useStyles()

  const [command, setCommand] = React.useState(initialInput)
  const [unit] = React.useState(initialUnit)
  const [group] = React.useState(initialGroup)
  const [ic] = React.useState(initialIC)
  const [isAssigned, setIsAssigned] = React.useState(false)
  const [aiResponse, setAiResponse] = React.useState('')

  React.useEffect(() => {
    setAiResponse(output)
  }, [output])

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
      <H5 align='center'>Sample Command</H5>
      <Box
        display='flex'
        flexDirection='row'
        justifyContent='space-evenly'
        pt='2'>
        <div className={classes.textContainer}>
          <H5 align='center'>Input</H5>
          <MUITextField
            key='match'
            fullWidth={true}
            id='match'
            label='Command'
            value={command}
            onChange={(e) => {
              e.target.value = e.target.value.toUpperCase()
              handleInputChange(e)
              setCommand(e.target.value)
            }}
            className={classes.textField}
            multiline
          />
          <MUITextField
            key='unit'
            fullWidth={true}
            id='unit'
            label='Unit'
            defaultValue={unit}
            onChange={(e) => {
              e.target.value = e.target.value.toUpperCase()
              handleUnitChange(e)
            }}
            className={classes.textField}
          />
          <MUITextField
            key='group'
            fullWidth={true}
            id='group'
            label='Group'
            defaultValue={group}
            onChange={(e) => {
              e.target.value = e.target.value.toUpperCase()
              handleGroupChange(e)
            }}
            className={classes.textField}
          />
          <MUITextField
            key='ic'
            fullWidth={true}
            id='ic'
            label='Incident Command'
            defaultValue={ic}
            onChange={(e) => {
              e.target.value = e.target.value.toUpperCase()
              handleICChange(e)
            }}
            className={classes.textField}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isAssigned}
                onChange={(e) => {
                  handleIsAssigned(e)
                }}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            }
            label='Unit previously assigned'
          />
        </div>
        <Divider orientation='vertical' flexItem />
        <div className={classes.textContainer}>
          <H5 align='center'>Output</H5>
          <MUITextField
            key='response'
            fullWidth={true}
            id='response'
            label='Response'
            value={aiResponse}
            disabled={true}
            className={classes.textFieldResponse}
            multiline
          />
        </div>
      </Box>
    </Box>
  )
}

export default Form
