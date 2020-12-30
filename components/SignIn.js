import { useState } from 'react'
import { AmplifyContainer, AmplifyAuthenticator, AmplifySignIn, AmplifySignUp } from '@aws-amplify/ui-react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button, { Contained } from 'mui/Button'

const useStyles = makeStyles(theme => ({
  // root: {
  //   '& :root': {
  //     '--background-color': '#ff0000',//theme.palette.background.default,
  //     '--border-radius': `${theme.shape.borderRadius}px`,
  //     '--box-shadow': '1px 1px 4px 0 rgba(0, 0, 0, 0.15)',
  //     '--container-align': 'center',
  //     '--container-display': 'flex',
  //     //'--container-height': '100vh',
  //     '--container-justify': 'center',
  //     '--margin': theme.spacing(0),
  //     '--padding': theme.spacing(0),
  //     // '--min-width': '20rem',
  //     // '--width': '28.75rem'
  //   }
  // }
}))

const MenuButton = withStyles(theme => ({
  root: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.background.paper
    }
  }
}))(Contained)

const SignIn = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <div className={classes.root}>
      <MenuButton onClick={handleOpen} disableElevation>Sign In</MenuButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
          <AmplifyContainer>
            <AmplifyAuthenticator>
              <AmplifySignUp slot="sign-up" headerText="Sign up for a free demo" formFields={[
                { type: "username" },
                { type: "password" },
                { type: "email" }
              ]}></AmplifySignUp>
              <AmplifySignIn slot="sign-in" headerText="Have an account? Sign in."></AmplifySignIn>
            </AmplifyAuthenticator>
          </AmplifyContainer>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default SignIn