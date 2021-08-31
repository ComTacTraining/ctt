import { makeStyles } from '@material-ui/core/styles'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'

const useStyles = makeStyles(() => ({
  label: {
    display: 'flex',
    flexFlow: 'row no-wrap',
    alignItems: 'center'
  }
}))

const ChipLabel = ({ find, replace }) => {
  const classes = useStyles()

  return (
    <div className={classes.label}>
      {find} <ArrowRightIcon fontSize='small' /> {replace}
    </div>
  )
}

export default ChipLabel
