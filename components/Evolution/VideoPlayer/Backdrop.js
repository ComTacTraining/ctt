import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    backgroundColor: '#000000',
    position: 'relative'
  },
  
}))

const Backdrop = ({ children }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {children}
    </div>
  )
}

export default Backdrop