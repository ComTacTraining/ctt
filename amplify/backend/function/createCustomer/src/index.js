/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var authCtta99ddfd3UserPoolId = process.env.AUTH_CTTA99DDFD3_USERPOOLID
var apiCttGraphQLAPIIdOutput = process.env.API_CTT_GRAPHQLAPIIDOUTPUT
var apiCttGraphQLAPIEndpointOutput = process.env.API_CTT_GRAPHQLAPIENDPOINTOUTPUT

Amplify Params - DO NOT EDIT */
const { CognitoIdentityServiceProvider } = require("aws-sdk");
const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();
const axios = require("axios");
const gql = require("graphql-tag");
const graphql = require("graphql");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { print } = graphql;

const createSubscription = gql`
  mutation createSubscription($input: CreateSubscriptionInput!) {
    createSubscription(input: $input) {
      id
      user
      stripeCustomerId
    }
  }
`;

const getUserEmail = async event => {
  const params = {
    UserPoolId: process.env.AUTH_CTTA99DDFD3_USERPOOLID,
    Username: event.identity.claims.username
  };
  const user = await cognitoIdentityServiceProvider
    .adminGetUser(params)
    .promise();
  const { Value: email } = user.UserAttributes.find(attr => {
    if (attr.Name === "email") {
      return attr.Value;
    }
  });
  return email;
};

exports.handler = async event => {
  try {
    // const email = await getUserEmail();
    const customer = await stripe.customers.create({
      username: `${event.username}`
    });
    const graphqlData = await axios({
      url: process.env.API_CTT_GRAPHQLAPIENDPOINTOUTPUT,
      method: "post",
      headers: {
        "x-api-key": process.env.API_CTT_GRAPHQLAPIKEYOUTPUT
      },
      data: {
        query: print(createSubscription),
        variables: {
          input: {
            user: username,
            stripeCustomerId: customer.id
          }
        }
      }
    });
    const body = {
      message: "successfully created customer",
      data: graphqlData
    };
    return {
      statusCode: 200,
      body: JSON.stringify(body),
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    };
  } catch (err) {
    console.log("error posting to appsync: ", err);
  }
};
