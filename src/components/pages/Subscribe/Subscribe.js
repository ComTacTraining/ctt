import React, { useEffect, useState } from "react";
import { Auth, API, graphqlOperation } from "aws-amplify";
import Lambda from "aws-sdk/clients/lambda";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import cardImageSrc from "assets/images/structure.png";
// import CheckoutForm from './CheckoutForm';

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: 140
  },
  green: {
    color: green[400]
  },
  wrapIcon: {
    verticalAlign: "middle",
    display: "inline-flex",
    marginTop: "1rem"
  }
});

const PrivacyPolicy = () => {
  const classes = useStyles();
  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    const load = async () => {
      const stripePromise = await loadStripe(
        process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
      );
      setStripe(stripePromise);
    };
    load();
  }, []);

  const handleSubscribe = async () => {
    const response = await Auth.currentAuthenticatedUser();
    Auth.currentCredentials().then(credentials => {
      const lambda = new Lambda({
        credentials: Auth.essentialCredentials(credentials)
      });
      const result = lambda.invoke({
        FunctionName: "createCustomer",
        Payload: JSON.stringify({ username: `${response.username}` })
      });
      console.log(result);
    });
  };

  return (
    <Grid container justify="center">
      <Grid item>
        <Elements stripe={stripe}>
          <Card className={classes.root}>
            <CardActionArea onClick={handleSubscribe}>
              <CardMedia
                className={classes.media}
                image={cardImageSrc}
                title="Membership"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Become a member
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Receive unlimited monthly access to the Command Tactical
                  Training program for just $40.
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className={classes.wrapIcon}
                >
                  <CheckCircleIcon className={classes.green} fontSize="small" />
                  Unlimited monthly access
                </Typography>
                <br />
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className={classes.wrapIcon}
                >
                  <CheckCircleIcon className={classes.green} fontSize="small" />
                  Custom alarms
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" onClick={handleSubscribe}>
                Subscribe
              </Button>
            </CardActions>
          </Card>
        </Elements>
      </Grid>
    </Grid>
  );
};

export default PrivacyPolicy;
