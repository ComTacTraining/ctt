import Accordion from '@/components/Simulation/AdminPanel/Accordion'
import Command from '@/components/Simulation/AdminPanel/Command'
import Loading from '@/components/UI/Loading'
import { useUser } from '@/hooks/useUser'
import { Contained } from '@/mui/Button'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import * as React from 'react'

const useStyles = makeStyles((theme) => ({
  adminButton: {
    marginBottom: theme.spacing(2),
    textAlign: 'center'
  }
}))

const AdminPanel = ({ children }) => {
  const classes = useStyles()
  const { isLoading, isAdmin } = useUser()
  const [showDebug, setShowDebug] = React.useState(true)

  const toggleShowDebug = () => {
    setShowDebug(!showDebug)
  }

  return isLoading ? (
    <Loading />
  ) : !isAdmin ? (
    <>{children}</>
  ) : (
    <Grid container spacing={1}>
      <Grid item xs={12} className={classes.adminButton}>
        <Contained onClick={toggleShowDebug}>
          {showDebug ? 'Hide' : 'Show'} Admin Panel
        </Contained>
      </Grid>
      <Grid item xs={showDebug ? 6 : 12}>
        <>{children}</>
        {showDebug && <Command />}
      </Grid>
      {showDebug && (
        <Grid item xs={6}>
          <Grid container alignContent='center'>
            <Grid item xs={12}>
              <Accordion />
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}

export default AdminPanel
