import React, { useContext } from "react";
import { Route } from "react-router-dom";

import context from "../../context/AdminContext";

const RigthAccessRoute = ({ role = 0, component: Component, ...rest }) => {
  const { isAuthenticatedUser } = useContext(context).auth;

  const isAuthorised =
    isAuthenticatedUser &&
    [role, 1].indexOf(isAuthenticatedUser.user.role) !== -1;

  return (
    isAuthorised && (
      <Route {...rest} render={(props) => <Component {...props} />} />
    )
  );
};

export default RigthAccessRoute;
