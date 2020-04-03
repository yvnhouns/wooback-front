import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import context from "../../context/AdminContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticatedUser } = useContext(context).auth;
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticatedUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/signin", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
