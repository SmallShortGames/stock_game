import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "../src/assets/css/custom.scss";

import MainPage from "./views/MainPage/MainPage.js";
import TestPage from "./views/TestPage/TestPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegistrationPage from "./views/RegistrationPage/RegistrationPage.js";
import UserProfilePage from "./views/UserProfilePage/UserProfilePage.js";

var hist = createBrowserHistory();

export const AuthContext = React.createContext();

export default function App() {
  return (
    <AuthContext.Provider>
      <Router history={hist}>
        <Switch>
          <Route path="/test-page" component={TestPage} />
          <Route path="/login-page" component={LoginPage} />
          <Route path="/registration-page" component={RegistrationPage} />
          <Route path="/user-profile-page" component={UserProfilePage} />
          <Route path="/" component={MainPage} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}
