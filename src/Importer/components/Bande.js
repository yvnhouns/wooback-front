import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { TitleTypography } from "../../components/Typography";
// const Progress = lazy(() => import("./Progress"));
import Progress from "./Progress";
import CircularProgress from "@material-ui/core/CircularProgress";

const Bande = ({ query, allStatus, setQuery }) => {
  const classes = useStyles();

  const { page, status, error } = query;
  const statusText = allStatus[status];
  return (
    <Paper className={classes.paper}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TitleTypography>
            <strong> Page {page} </strong> / status :{" "}
            {status === 4 ? (
              <span style={{ color: "red" }}>{`${statusText}: ${error}`}</span>
            ) : (
              statusText
            )}
          </TitleTypography>
        </Grid>
        <Grid item xs={12}>
          {status === 0 ? (
            <CircularProgress />
          ) : status === 1 ? (
            <LinearProgress />
          ) : (
            <Progress status={status} />
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  root: {
    // backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
}));

const isEqual = (prev, next) => {
  return (
    JSON.stringify({ query: prev.query }) ===
    JSON.stringify({ query: next.query })
  );
};
export default React.memo(Bande, isEqual);
