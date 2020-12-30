import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  '@global': {
    ':root': {
      '--amplify-container-height': '50vh',
      // '--amplify-background-color': red[900],
      '--amplify-border-radius': '5px',//`${theme.shape.borderRadius.valueOf}px`,
      '--amplify-font-family': theme.typography.fontFamily,
      '--amplify-primary-color': theme.palette.primary.main,
      '--amplify-primary-tint': theme.palette.primary.light,
      '--amplify-primary-shade': theme.palette.primary.dark,
      '--amplify-secondary-color': theme.palette.text.primary,
      '--amplify-secondary-contrast': theme.palette.secondary.contrastText,
    },
    'amplify-authenticator': {
      // '--amplify-background-color': '#000000',
      // '--amplify-container-height': '50vh',
    }
  },
  root: {
    flexGrow: 1
  },
}))

const Styles = ({ children }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      {children}
    </div>
  )
}

export default Styles