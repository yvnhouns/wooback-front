import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { SIGNIN_LINK, NOT_AUTHORIZATION_LINK } from "../../routerLinks";
import context from "../../context/AdminContext";

const AdminRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticatedUser } = useContext(context).auth;

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticatedUser ? (
          <>
            {isAuthenticatedUser.user.role === 1 ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: NOT_AUTHORIZATION_LINK,
                  state: { from: props.location }
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

export default AdminRoute;
