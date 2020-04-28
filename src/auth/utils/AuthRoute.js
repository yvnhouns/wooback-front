import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { SIGNIN_LINK, NOT_AUTHORIZATION_LINK } from "../../routerLinks";
import context from "../../context/AdminContext";

const AuthRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticatedUser } = useContext(context).auth;
  const { user } = isAuthenticatedUser;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticatedUser ? (
          <>
            {user.accesses ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: NOT_AUTHORIZATION_LINK,
                  state: { from: props.location },
                }}
              />
            )}
          </>
        ) : (
          <Redirect
            to={{ pathname: SIGNIN_LINK, state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default AuthRoute;
