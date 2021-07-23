import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import { H3, H6, P } from 'mui/Typography'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    color: theme.palette.text.primary,
    '& > div': {
      padding: theme.spacing(2)
    }
  },
}))

const OrderSummary = () => {
  const classes = useStyles()
  return (
    <Grid container direction="column" justify="center" alignItems="center" className={classes.root}>
      <Grid item>
        <H3>Order Summary</H3>
        <Divider variant="middle" />
      </Grid>
      <Grid item>
        <H6>Standard subscription: $40.00 / monthly</H6>
      </Grid>
      <Grid item>
        <Divider variant="middle" />
        <P>Today's charge: $40.00</P>
      </Grid>
    </Grid>
  );
};

export default OrderSummary