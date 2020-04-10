import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
//  import { Debug } from "mui-rff";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import SuspensePaper from "../components/SuspensePaper";
import context from "../context/AdminContext";
import Form from "./components/Form";
import Bande from "./components/Bande";
import { LinkButton } from "../components/LinkButton";

const Importer = ({
  addNextComponent,
  importComponentNativeState,
  setCurrentViewerTitleAndAction,
  alertState: { setError, setSuccess },
  previous,
}) => {
  const {
    setting,
    isCompleted,
    isSubmited,
    queries,
    status,
    submitSetting,
    setQuery,
    percent,
    frequence,
    initializeSetting,
  } = useContext(context).importer;

  const classes = useStyles({ percent, frequence });

  const nativeState = {
    comp: "importer",
  };

  const inputState = {
    addNextComponent,
    setCurrentViewerTitleAndAction,
  };

  useEffect(() => {
    importComponentNativeState({ ...nativeState });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (values, form) => {
    const { per_page, page, page_count, frequence } = values;

    values.per_page = parseInt(per_page || "0");
    values.page = parseInt(page || "0");
    values.page_count = parseInt(page_count || "0");
    values.frequence = parseInt(frequence || "0");
    submitSetting(values);
  };

  const count = queries.length;
  const current = queries
    .filter((item) => item.status === (1 || 2))
    .map((item) => (
      <Bande
        setQuery={setQuery}
        key={item.page}
        query={item}
        allStatus={status}
      />
    ));

  const completed = queries
    .filter((item) => [3, 4].indexOf(item.status) !== -1)
    .map((item) => (
      <Bande
        setQuery={setQuery}
        key={item.page}
        query={item}
        allStatus={status}
      />
    ));

  return (
    <Grid spacing={2} container>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
        item
        sm={6}
        xs={12}
      >
        {count > 0 ? (
          <>
            {percent !== 100 && (
              <Paper className={classes.current}>{current}</Paper>
            )}
            <Paper className={classes.completed}> {completed}</Paper>
          </>
        ) : (
          <Paper className={classes.paper}></Paper>
        )}
      </Grid>

      <Grid container item sm={6} xs={12}>
        <SuspensePaper>
          <Form
            classes={classes}
            initialValues={setting}
            loading={isSubmited}
            success={isCompleted}
            onSubmit={onSubmit}
            initializeSetting={initializeSetting}
          />
        </SuspensePaper>
        <Paper className={classes.percentage}>
          {(isCompleted || isSubmited) && (
            <>
              <Typography variant="h5"> {Math.round(percent)} % </Typography>
              <LinkButton onClick={initializeSetting}> annuler </LinkButton>
            </>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    height: "540px",
    padding: theme.spacing(2, 3),
    width: "100%",
  },
  current: {
    padding: theme.spacing(2, 3),
    width: "100%",
  },
  completed: {
    maxHeight: (props) => (props.percent === 100 ? "550px" : "350px"),
    height: (props) => (props.percent === 100 ? "550px" : "350px"),
    padding: theme.spacing(2, 3),
    marginTop: theme.spacing(1),
    width: "100%",
    overflowY: "auto",
  },
  percentage: {
    height: "250px",
    padding: theme.spacing(2, 3),
    "width": "100%",
    "textAlign": "center",
  },

  root: {
    // backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
}));

export default Importer;
