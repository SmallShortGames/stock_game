import React from "react";
import { Route, Redirect } from "react-router-dom";
import userContext from "../../services/userContext";

export default function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <>
      <userContext.Consumer>
        {([authTokens, _setAuthTokens]) => {
          return (
            <Route
              {...rest}
              render={(props) => {
                  // when I have the back end up and running 
                return true ? (
                  <Component {...props} />
                ) : (
                  <Redirect to="/registration-page" />
                );
              }}
            />
          );
        }}
      </userContext.Consumer>
    </>
  );
}
