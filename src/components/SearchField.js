import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import FilterListIcon from "@material-ui/icons/FilterList";
import { ButtonSimple } from "./Buttons";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function CustomizedInputBase({
  inputFieldProps,
  handleShowFilter,
  handleCheckable,
  checkable,
  classes = {},
  ...paperProps
}) {
  const localClasses = useStyles();

  return (
    <Paper {...paperProps} className={clsx(localClasses.root, classes)}>
      <IconButton
        // type="submit"
        className={localClasses.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
      <InputBase
        {...inputFieldProps}
        className={localClasses.input}
        placeholder="Isbn, nom , marque, collection, selection .... "
        inputProps={{
          "aria-label": "Isbn, nom , marque, collection, selection",
        }}
      />
      {handleShowFilter && (
        <>
          <Divider className={localClasses.divider} orientation="vertical" />
          <IconButton
            color="primary"
            className={localClasses.iconButton}
            onClick={handleShowFilter}
            aria-label="filter"
          >
            <FilterListIcon />
          </IconButton>
        </>
      )}
      {handleCheckable && (
        <>
          <Divider className={localClasses.divider} orientation="vertical" />
          <ButtonSimple variant="text" onClick={handleCheckable}>
            <strong> {!checkable ? "Sélectioner" : "Annuler"} </strong>
          </ButtonSimple>
        </>
      )}
    </Paper>
  );
}
