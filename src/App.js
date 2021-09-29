import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import { getABI } from "./api/TwetchActions";

import HandCashCallBack from "./page/HandCashCallBack";
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
import "./styles.css";

export default function App() {
  useEffect(() => {
    setABI();
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/auth" component={Auth} />
        <Route
          exact
          path="/auth/callback/twetch"
          render={() => <TwetchCallback />}
        />
        <Route
          path="/auth/callback/handcash"
          render={() => <HandCashCallBack />}
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
        <Route exact path="/t/:id" render={(props) => <Detail {...props} />} />
        <Route exact path="/u/:id" render={(props) => <Profile {...props} />} />
      </Switch>
    </div>
  );
}

const setABI = async () => {
  if (!localStorage.getItem("abi")) {
    let abi = await getABI();
    localStorage.setItem("abi", JSON.stringify(abi));
  }
};
