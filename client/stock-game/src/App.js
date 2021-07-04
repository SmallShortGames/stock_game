import React, {useState} from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import MainPage from "./views/MainPage/MainPage.js";
import TestPage from "./views/TestPage/TestPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegistrationPage from "./views/RegistrationPage/RegistrationPage.js";

import ProtectedRoute from "./components/ProtectedRoute/index.jsx";
import userContext from "./services/userContext.js";

export default function App() {
  var hist = createBrowserHistory();
  const [authTokens, setAuthTokens] = useState({});

  return (
    <Router history={hist}>
      <userContext.Provider value={[authTokens, setAuthTokens]}>
    <Switch>
      <ProtectedRoute path="/test-page" component={TestPage} />
      <Route path="/login-page" component={LoginPage} />
      <Route path="/registration-page" component={RegistrationPage} />
      <ProtectedRoute path="/" component={MainPage} />
    </Switch>
    </userContext.Provider>
  </Router>
  );
}
