import React, { useContext, useEffect, useState } from "react";
import RootContext from "../rootContext/RootContext";

import Adresses from "./layout/Adresses";
import Compte from "./layout/Compte";
import Orders from "./layout/Orders";
import Notifications from "./layout/Notifications";
import Payments from "./layout/Payment";
import Messages from "./layout/Messages";
import * as routeLink from "../routerLinks";

import { Link as RouterLink } from "react-router-dom";

import { Divider, Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useHistory } from "react-router-dom";
import DashboardInit from "./layout/DashBoardInit";
const Dashboard = ({ location }) => {
  const classes = useStyles();
  const history = useHistory();

  const { isAuthenticatedUser, logout } = useContext(RootContext).auth;
  const { profile, readUser, updateUser } = useContext(RootContext).user;

  const user = isAuthenticatedUser.user;
  const state = { user, logout, profile, readUser, updateUser };

  const [canRender, setCanRender] = useState(false);

  const menuListe = [
    {
      path: routeLink.DASHBOARD_LINK,
      title: "Tableau de bord",
      content: ownProps => <DashboardInit {...ownProps} />
    },
    {
      path: routeLink.ORDERS_LINK,
      title: "Commandes",
      content: ownProps => <Orders {...ownProps} />
    },
    {
      path: routeLink.ADRESSES_LINK,
      title: "Adresses",
      content: ownProps => <Adresses {...ownProps} />
    },
    {
      path: routeLink.COMPTE_LINK,
      title: "Détails du compte",
      content: ownProps => <Compte {...ownProps} />
    },
    {
      path: routeLink.PAYMENT_LINK,
      title: "Payements",
      content: ownProps => <Payments {...ownProps} />
    },
    {
      path: routeLink.NOTIFICATIONS_LINK,
      title: "Notification",
      content: ownProps => <Notifications {...ownProps} />
    },
    {
      path: routeLink.MESSAGES_LINK,
      title: "Messages",
      content: ownProps => <Messages {...ownProps} />
    },
    {
      path: routeLink.COUPONS_LINK,
      title: "Coupons",
      content: ownProps => <Messages {...ownProps} />
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    readUser(() => {
      setCanRender(true);
    });

    setCanRender(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderContent = () => {
    if (canRender) {
      const component = menuListe.find(menu => menu.path === location.pathname);
      return component !== undefined
        ? component.content(state)
        : history.push(routeLink.DASHBOARD_LINK);
    }
  };

  return (
    <Grid
      container
      spacing={4}
      direction="row"
      justify="flex-start"
      alignItems="stretch"
      className={classes.root}
    >
      <Grid item xs={3}>
        <List component="nav" className={classes.items} aria-label="contacts">
          {menuListe.map((menu, index) => (
            <ListItem
              divider
              button
              key={index}
              component={RouterLink}
              to={menu.path}
            >
              <ListItemText primary={menu.title} />
            </ListItem>
          ))}

          <Divider />

          <ListItem
            button
            component={RouterLink}
            to={routeLink.PARTENAIRE_DASHBOARD_LINK}
          >
            <ListItemText primary="Patenaire" />
          </ListItem>
        </List>
      </Grid>
      <Grid xs={9} item>
        <Paper className={classes.paper}>{renderContent()}</Paper>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    //width: '100%',
    padding: theme.spacing(2, 5)
    //backgroundColor: theme.palette.background.paper
  },
  items: {
    //width: '100%',
    maxWidth: 280
    // backgroundColor: theme.palette.background.paper,
  },
  paper: {
    // height: "100%",
    padding: theme.spacing(2, 2)
  }
}));

export default Dashboard;
