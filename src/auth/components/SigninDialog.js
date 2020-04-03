import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import MuiDialog from "@material-ui/core/Dialog";
import SigninForm from "./SigninForm";

import RootContext from "../../rootContext/RootContext";

import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { useHistory } from "react-router-dom";

const SigninDialog = props => {
  const { classes } = props;
  const hystory = useHistory();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));


  const {
    signin,
    authenticate,
    openSigninDialog,
    setOpenSigninDialog,
    signinError,
    setOpenSignupDialog
  } = useContext(RootContext).auth;

  const handleClickOpen = () => {
    setOpenSigninDialog(true);
  };
  const handleClose = () => {
    setOpenSigninDialog(false);
  };

  const forwardToSignup = () => {
    handleClose();
    setOpenSignupDialog(true);
  };

  const nextStep = () => {
    let nextPath = "/";
    if (
      hystory.location.pathname === "/signin" &&
      hystory.location.state.from.pathname !== undefined
    ) {
      nextPath = hystory.location.state.from.pathname;
    }
    hystory.push(nextPath);
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        className={classes.button}
      >
        Se connecter
      </Button>

      <Dialog
        maxWidth="xs"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openSigninDialog}
        fullScreen={fullScreen}
      >
        <SigninForm
          forwardToSignup={forwardToSignup}
          nextStep={nextStep}
          openInDialog={true}
          closeDialog={handleClose}
          signin={signin}
          authenticate={authenticate}
          signinError={signinError}

        />
      </Dialog>
    </div>
  );
};

export default SigninDialog;

const Dialog = withStyles(theme => ({
  paperWidthXs: {
    maxWidth: "345px"
  }
}))(MuiDialog);
