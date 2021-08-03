import { green } from '@material-ui/core/colors'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'

const useStyles = makeStyles((theme) => ({
  itemIcon: {
    minWidth: '28px'
  }
}))

const featureSet = [
  'Custom Response System',
  'Education & Performance System',
  'Commercial, Industrial, Single or Multi-Family Simulations',
  'Access to Peer Reviews'
]
const Features = () => {
  const classes = useStyles()
  return (
    <List dense={true}>
      {featureSet.map((f) => (
        <ListItem key={f}>
          <ListItemIcon className={classes.itemIcon}>
            <CheckCircleIcon fontSize='small' style={{ color: green[500] }} />
          </ListItemIcon>
          <ListItemText primary={f} />
        </ListItem>
      ))}
    </List>
  )
}

export default Features
