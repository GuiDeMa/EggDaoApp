import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import { getABI } from "./api/TwetchActions";
import { Paper, createTheme, ThemeProvider } from "@mui/material";
import TwetchCallback from "./page/TwetchCallBack";
import Auth from "./page/Auth";
import Notifications from "./page/Notifications";
import Compose from "./page/Compose";
import Home from "./page/Home";
import Ideas from "./page/Ideas";
import Jobs from "./page/Jobs";
import Features from "./page/Features";
import Projects from "./page/Projects";
import Profile from "./page/Profile";
import Search from "./page/Search";
import Detail from "./page/Detail";
import Welcome from "./page/Welcome";
import Settings from "./page/Settings";
import "./style.css";

export default function App() {
  const theme = createTheme({
    palette: {
      mode: "light",
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
          <Route exact path="/notifications" component={Notifications} />
          <Route exact path="/" component={Home} />
          <Route exact path="/methods" component={Ideas} />
          <Route exact path="/projects" component={Projects} />
          <Route exact path="/features" component={Features} />
          <Route exact path="/jobs" component={Jobs} />
          <Route exact path="/settings" component={Settings} />
          <Route
            exact
            path="/compose/:id"
            render={(props) => <Compose {...props} />}
          />
          <Route exact path="/compose" component={Compose} />
          <Route
            exact
            path="/search/"
            search="searchTerm=:slug"
            render={(props) => <Search {...props} />}
          />
          <Route
            exact
            path="/t/:id"
            render={(props) => <Detail {...props} />}
          />
          <Route
            exact
            path="/u/:id"
            render={(props) => <Profile {...props} />}
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
