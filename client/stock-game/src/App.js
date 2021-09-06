import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "../src/assets/css/custom.scss";

import DashboardLayout from "./layouts/DashboardLayout";

import Trade from "./views/Trade";
import MainPage from "./views/MainPage/MainPage.js";
import TestPage from "./views/TestPage/TestPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegistrationPage from "./views/RegistrationPage/RegistrationPage.js";
import Profile from "./views/Profile";
import Search from "./views/Search";

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
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.data.username,
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
          <DashboardLayout>
            <Switch>
              <Route path="/profile" component={Profile} />
              <Route path="/search" component={Search} />
              <Route path="/test" component={TestPage} />
              <Route path="/trade" component={Trade} />
              <Route path="/*" component={MainPage} />
            </Switch>
          </DashboardLayout>
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
