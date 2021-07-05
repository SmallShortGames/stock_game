import React, { useState } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import MainPage from "./views/MainPage/MainPage.js";
import TestPage from "./views/TestPage/TestPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegistrationPage from "./views/RegistrationPage/RegistrationPage.js";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  id: null,
  email: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("id", JSON.stringify(action.payload.id));
      localStorage.setItem("email", JSON.stringify(action.payload.email));
      return {
        ...state,
        isAuthenticated: true,
        id: action.payload.id,
        email: action.payload.email,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        id: null,
        email: null,
      };
    default:
      return state;
  }
}
export default function App() {
  var hist = createBrowserHistory();

  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <Router history={hist}>
        {state.isAuthenticated ? (
          <Switch>
            <Route path="/test-page" component={TestPage} />
            <Route exact path="/*" component={MainPage} />{" "}
          </Switch>
        ) : (
          <Switch>
            <Route path="/login-page" component={LoginPage} />
            <Route path="/*" component={RegistrationPage} />
          </Switch>
        )}
      </Router>
    </AuthContext.Provider>
  );
}
