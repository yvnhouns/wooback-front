import React from "react";
import context from "../context/AdminContext";
import LinearProgress from "@material-ui/core/LinearProgress";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

// import CategoryForm from "./components/CategoryForm"

const Compte = React.lazy(() => import("./layout/Compte"));
const Account = ({ isAuthenticatedUser, ...props }) => {
  const { getFetcher, getUserInfoUrl, updateUser } = React.useContext(
    context
  ).user;

  const fetcher = getFetcher();
  const url = getUserInfoUrl();
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <React.Suspense fallback={<LinearProgress />}>
        <Compte
          fetcher={fetcher}
          url={url}
          updateUser={updateUser}
          user={isAuthenticatedUser.user}
          getUserInfoUrl={getUserInfoUrl}
          {...props}
        />
      </React.Suspense>
    </Paper>
  );
};

export default Account;

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: "600px",
    margin: "auto",
    padding: theme.spacing(2, 3),
  },
}));
