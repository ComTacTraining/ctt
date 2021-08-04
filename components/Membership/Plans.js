import Features from '@/components/Membership/Features'
import { Contained } from '@/mui/Button'
import { H5 } from '@/mui/Typography'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'
import Image from 'next/image'

const useStyles = makeStyles((theme) => ({
  plan: {
    margin: theme.spacing(4, 'auto'),
    textAlign: 'center',
    maxWidth: '320px'
  },
  card: {
    margin: theme.spacing(2, 'auto'),
    textAlign: 'center'
  },
  cardContent: {
    flexGrow: 0.5,
    color: theme.palette.text.primary
    // maxWidth: '400px'
  },
  lower: {
    fontSize: '1rem',
    fontWeight: '400',
    lineHeight: 1.5
  },
  actions: {
    textAlign: 'center',
    margin: '0 auto'
  }
}))

const Plans = ({ onCheckout }) => {
  const classes = useStyles()
  return (
    <Box className={classes.plan}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <H5>CTT Membership</H5>
          <Divider variant='middle' />
          <Features />
          <H5>
            $40.00<span className={classes.lower}>/month</span>
          </H5>
          <CardActions>
            <Contained className={classes.actions} onClick={() => onCheckout()}>
              Subscribe
            </Contained>
          </CardActions>
        </CardContent>
      </Card>
      <Image
        src='/powered-by-stripe.svg'
        width='150'
        height='34'
        alt='Powered by Stripe'
      />
    </Box>
  )
}

export default Plans
