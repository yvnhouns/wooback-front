import React from "react";
// import * as routeLink from "../routerLinks";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import { Typography, Paper } from "@material-ui/core";
import Link from "@material-ui/core/Link";

export default ({
  setCurrentViewTitle,
  isAuthenticatedUser,
  signout,
  ...props
}) => {
  const history = useHistory();
  const classes = useStyles();
  const { user } = isAuthenticatedUser || { user: {} };

  // const handleClickMenu = menuLink => {
  //   history.push(menuLink);
  // };

  return (
    <Paper className={classes.paper}>
      <Typography variant="subtitle1">
        Bonjour <strong> {user.nom} </strong> (vous n'êtes pas{" "}
        <strong> {user.nom} </strong> ?{" "}
        <Link
          onClick={() => signout(isAuthenticatedUser, () => history.push("./"))}
          variant="subtitle1"
          component="button"
        >
          <strong>Déconnexion</strong>
        </Link>
        )
      </Typography>
      <br />
      {/* <Typography>
        Vous êtes dans le mode administration du site .
        <br />A partir du tableau de bord de votre compte, vous pouvez
        visualiser les{" "}
        <Link
          onClick={() => handleClickMenu(routeLink.ADMIN_ORDER_LINK)}
          variant="subtitle1"
          component="button"
        >
          commandes récentes
        </Link>
        , gérer vos{" "}
        <Link
          onClick={() => handleClickMenu(routeLink.ADMIN_CUSTOMERS_LINK)}
          variant="subtitle1"
          component="button"
        >
          clients
        </Link>{" "}
        , administrer les produits{" "}
        <Link
          to={routeLink.ADMIN_PRODUCTS_LINK}
          onClick={() => handleClickMenu(routeLink.ADMIN_PRODUCTS_LINK)}
          variant="subtitle1"
          component="button"
        >
          produits
        </Link>{" "}
        et visualiser{" "}
        <Link
          to={routeLink.ADMIN_STATISTIQUE_LINK}
          onClick={() => handleClickMenu(routeLink.ADMIN_STATISTIQUE_LINK)}
          variant="subtitle1"
          component="button"
        >
          les différents statistique
        </Link>
        .
      </Typography> */}
    </Paper>
  );
};

const useStyles = makeStyles(theme => ({
  paper: {
    height: "300px",
    padding: theme.spacing(2, 4)
  },
  root: {
    // backgroundColor: theme.palette.background.paper,
    width: "100%"
  }
}));
