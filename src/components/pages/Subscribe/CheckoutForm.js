import React, { useEffect, useState } from "react";
import { Auth, API, graphqlOperation } from "aws-amplify";
import Lambda from "aws-sdk/clients/lambda";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createMember, updateMember } from "graphql/mutations";
import { getMember } from "graphql/queries";

const useStyles = makeStyles(theme => ({
  btn: {
    marginTop: `${theme.spacing(2)}px`
  }
}));

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      marginTop: "10px",
      iconColor: "#86352C",
      color: "#86352C",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#c3c3c3" }
    }
  }
};

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const classes = useStyles();
  const [username, setUsername] = useState(null);
  const [hasProfile, setHasProfile] = useState(false);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const waitForAuth = async () => {
      const response = await Auth.currentAuthenticatedUser();
      setUsername(response.username);
      Auth.currentCredentials().then(credentials => {
        console.log("Here I am");
        const lambda = new Lambda({
          credentials: Auth.essentialCredentials(credentials)
        });
        const result = lambda.invoke({
          FunctionName: "createProfile",
          Payload: JSON.stringify({ username: `${response.username}` })
        });
        console.log(result);
      });
    };
    waitForAuth();
  }, []);

  useEffect(() => {
    const waitForProfile = async () => {
      try {
        const { data } = await API.graphql(
          graphqlOperation(getMember, { id: `${username}` })
        );
        if (data) {
          const member = data.getMember;
          const customer = member.customerId ? member.customerId : null;
          const subscription = member.subscriptionId
            ? member.subscriptionId
            : null;
          setHasProfile(true);
          setProfile({ customer, subscription });
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (stripe && username) {
      waitForProfile();
    }
  }, [username, stripe]);

  // useEffect(() => {
  //   const createSubscription = async () => {
  //     const subscription = await stripe.subscriptions.create({
  //       customer: profile.customerId,
  //       items: [
  //         {price: `${process.env.REACT_APP_STRIPE_PRICE_ID}`},
  //       ],
  //     });
  //     await API.graphql(graphqlOperation(updateMember, { id: `${username}`, subscriptionId: `${subscription.id}` }));
  //     setProfile({ customer: profile.customerId, subscription: subscription.id });
  //   }

  //   const createCustomer = async () => {
  //     const customer = await stripe.customers.create({
  //       description: `${username}`,
  //     });
  //     if (customer) {
  //       if (hasProfile) {
  //         await API.graphql(graphqlOperation(updateMember, { id: `${username}`, customerId: `${customer.id}` }));
  //       } else {
  //         await API.graphql(graphqlOperation(createMember, { id: `${username}`, customerId: `${customer.id}` }));
  //         setHasProfile(true);
  //       }
  //       setProfile({ customer: customer.id, subscription: null });
  //     }
  //   }

  //   if (stripe && username) {
  //     if (!profile.subscriptionId && profile.customerId) {
  //       createSubscription();
  //     } else if (!profile.subscriptionId && !profile.customerId) {
  //       createCustomer();
  //     }
  //   }
  // }, [username, profile, hasProfile, stripe]);

  const handleSubmit = async event => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement
    });
    if (error) {
      console.log("[error]", error);
    } else {
      console.log(paymentMethod);
      // dispatch(saveSubscription(paymentMethod));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={CARD_OPTIONS} />
      <Button
        className={classes.btn}
        variant="contained"
        color="primary"
        type="submit"
        disabled={!stripe}
      >
        Pay
      </Button>
    </form>
  );
};

export default CheckoutForm;
