import React from "react";
import { Route } from "react-router-dom";
import { BrowserRouter, Switch } from "react-router-dom";
import { StateInspector } from "reinspect";
import NotFound from "./core/NotFound";
import NotAuthorization from "./core/NotAuthorization";
import { SWRConfig } from "swr";
import NavBar from "./layout/NavBar";
import AdminDashboard from "./core/AdminDashboard";
import * as adminRouteLink from "./routerLinks";
import AdminProvider from "./context/AdminProvider";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "./Alert";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import AdminRoute from "./auth/utils/AuthRoute";
// import UserInfoListne from "./auth/Listner";

import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import { fetcherWithBody as fetcher } from "./utils/fecthers";

import {
  createMuiTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@material-ui/core/styles";

let theme = createMuiTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3, 0),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
}));

const Routes = () => {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <StateInspector name="App">
        <SWRConfig
          value={{
            dedupingInterval: 4000,
            loadingTimeout: 5000,
            refreshWhenHidden: false,
            suspense: true,
            // refreshWhenOffline: true,
            // refreshInterval: 5000,
            fetcher,
          }}
        >
          <AdminProvider>
            <div className={classes.root}>
              {/* <UserInfoListne /> */}
              <CssBaseline />

              <NavBar />
              <Container maxWidth="lg">
                <ThemeProvider theme={theme}>
                  <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Switch>
                      {/* <Route {...rest} render={props => <Component {...props} />} />; */}

                      <AdminRoute path="/" exact component={AdminDashboard} />

                      <Route
                        path={adminRouteLink.NOT_FOUND_LINK}
                        exact
                        component={NotFound}
                      />

                      <Route
                        path={adminRouteLink.NOT_AUTHORIZATION_LINK}
                        exact
                        component={NotAuthorization}
                      />

                      <AdminRoute
                        path={adminRouteLink.ADMIN_DASHBOARD_LINK}
                        exact
                        component={AdminDashboard}
                      />
                      <AdminRoute
                        path={adminRouteLink.ADMIN_IMPORT_LINK}
                        exact
                        component={AdminDashboard}
                      />
                      <AdminRoute
                        path={adminRouteLink.ADMIN_DASHBOARD_WITH_PARAM_LINK}
                        exact
                        component={AdminDashboard}
                      />
                      <Route
                        path={adminRouteLink.SIGNIN_LINK}
                        exact
                        component={Signin}
                      />
                      <Route
                        path={adminRouteLink.SIGNUP_LINK}
                        exact
                        component={Signup}
                      />
                      <Route
                        path={adminRouteLink.ADMIN_MANAGE_USER_LINK}
                        exact
                        component={AdminDashboard}
                      />
                      <Route
                        path={adminRouteLink.ADMIN_COMPTE_LINK}
                        exact
                        component={AdminDashboard}
                      />

                      <Route
                        path={adminRouteLink.ADMIN_MANAGE_ACTION_LINK}
                        exact
                        component={AdminDashboard}
                      />
                      <Route
                        path={adminRouteLink.ADMIN_MANAGE_PRIVILEGE_LINK}
                        exact
                        component={AdminDashboard}
                      />
                    </Switch>
                    <Alert />
                  </main>
                </ThemeProvider>
              </Container>
            </div>
          </AdminProvider>
        </SWRConfig>
      </StateInspector>
    </BrowserRouter>
  );
};

export default Routes;
