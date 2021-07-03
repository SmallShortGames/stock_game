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
                return authTokens.data ? (
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
