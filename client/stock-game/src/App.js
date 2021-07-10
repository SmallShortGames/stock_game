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

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
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
