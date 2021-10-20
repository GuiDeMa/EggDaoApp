import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { getABI } from "./api/TwetchActions";
import { Paper, createTheme, ThemeProvider } from "@mui/material";
import TwetchCallback from "./page/TwetchCallBack";
import Auth from "./page/Auth";
import Notifications from "./page/Notifications";
import Compose from "./page/Compose";
import Dashboard from "./page/Dashboard";
import Profile from "./page/Profile";
import Search from "./page/Search";
import Detail from "./page/Detail";
import Welcome from "./page/Welcome";
import Settings from "./page/Settings";
import "./style.css";
import Features from "./page/Features";
import auth from "./utils/auth";

export default function App() {
  const theme = createTheme({
    palette: {
      mode: localStorage.colorMode || "light",
      primary: {
        main: "#b17c01" //config
      },
      secondary: {
        main: "#21e800" //config
      }
    }
  });
  useEffect(() => {
    setABI();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Paper square>
        <Switch>
          <Route exact path="/auth" component={Auth} />
          <Route
            exact
            path="/auth/callback/twetch"
            render={() => <TwetchCallback />}
          />
          <Route exact path="/welcome" component={Welcome} />
          <ProtectedRoute
            exact
            path="/notifications"
            component={Notifications}
          />
          <ProtectedRoute exact path="/" component={Dashboard} />
          <ProtectedRoute exact path="/features" component={Features} />
          <ProtectedRoute exact path="/settings" component={Settings} />
          <ProtectedRoute
            exact
            path="/compose/:id"
            component={(props) => <Compose {...props} />}
          />
          <ProtectedRoute exact path="/compose" component={Compose} />
          <ProtectedRoute
            exact
            path="/search/"
            search="searchTerm=:slug"
            component={(props) => <Search {...props} />}
          />
          <ProtectedRoute
            exact
            path="/t/:id"
            component={(props) => <Detail {...props} />}
          />
          <ProtectedRoute
            exact
            path="/u/:id"
            component={(props) => <Profile {...props} />}
          />
        </Switch>
      </Paper>
    </ThemeProvider>
  );
}

const setABI = async () => {
  if (!localStorage.getItem("abi")) {
    let abi = await getABI();
    localStorage.setItem("abi", JSON.stringify(abi));
  }
};

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.authenticated) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/welcome",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
