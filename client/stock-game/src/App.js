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
      localStorage.setItem("user", JSON.stringify(action.payload.username));
      localStorage.setItem("token", JSON.stringify("token"));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.username,
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
        {state.isAuthenticated ? (
          <Switch>
            <Route path="/profile" component={UserProfilePage} />
            <Route path="/test" component={TestPage} />
            <Route path="/*" component={MainPage} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/registration" component={RegistrationPage} />
            <Route path="/*" component={RegistrationPage} />
          </Switch>
        )}
      </Router>
    </AuthContext.Provider>
  );
}
