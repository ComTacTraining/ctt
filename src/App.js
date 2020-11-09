import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Amplify, { Auth, Hub } from "aws-amplify";
import Layout from "./components/Layout/Layout";
import GuestLayout from "./components/Layout/GuestLayout";
import Routes from "./Routes";
import { createStore } from "store";
import theme from "./theme";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const store = createStore();

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => setUser(user))
      .catch(() => console.log("User not signed in."));
    Hub.listen("auth", data => {
      switch (data.payload.event) {
        case "signIn":
          return setUser(data.payload.data);
        case "signOut":
          return setUser(null);
        default:
          return;
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          {user ? (
            <Layout>
              <Routes />
            </Layout>
          ) : (
            <GuestLayout>
              <Routes />
            </GuestLayout>
          )}
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
