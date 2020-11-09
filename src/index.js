import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Amplify from "aws-amplify";
import { AmazonAIPredictionsProvider } from "@aws-amplify/predictions";
import awsExports from "./aws-exports";
require("typeface-anton");
require("typeface-roboto");
Amplify.configure(awsExports);
Amplify.addPluggable(new AmazonAIPredictionsProvider());

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
