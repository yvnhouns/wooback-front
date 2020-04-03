import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {ButtonWithIcon } from "../../components/assets";
import SubmittingButton from "../../components/SubmittingButton";

const Validation = ({
  form,
  submitting,
  valid,
  pristine,
  rootStyle,
  success,
  submiting,
  classes = {}
}) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      className={rootStyle}
    >
      <Box display="flex" width="100%">
        <Box hidden={mobile} flexGrow={1}></Box>
        <Box display="inline-flex" width={mobile ? "100%" : "auto"}>
          <ButtonWithIcon
            onClick={form.reset}
            disabled={submitting || pristine}
            className={classes.button}
            fullWidth
          >
            Initialiser
          </ButtonWithIcon>
        </Box>
        <Box display="inline-flex" width={mobile ? "100%" : "auto"}>
          <SubmittingButton
            type="submit"
            // disabled={(pristine || !valid) | submiting}
            fullWidth
            loading={submiting}
            success={success}
          />
        </Box>
      </Box>
    </AppBar>
  );
};

export default Validation;
