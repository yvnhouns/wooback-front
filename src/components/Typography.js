import React from "react";
import MuiTypography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const TitleTypography = withStyles({
  root: {
    fontWeight: "500"
  }
})(props => <MuiTypography variant="subtitle1" {...props} />);

const TableHeaderTypography = withStyles({
  root: {
    fontWeight: "500"
  }
})(props => <MuiTypography variant="subtitle2" {...props} />);

const LargeTypography = withStyles({
  root: {
    //fontWeight: "500"
  }
})(props => <MuiTypography variant="h5" {...props} />);

const SubLargeTypography = withStyles({
  root: {
    // fontWeight: "500"
  }
})(props => <MuiTypography variant="subtitle1" {...props} />);

const SubTitleTypography = withStyles({
  root: {
    fontWeight: "300"
  }
})(props => <MuiTypography variant="body2" {...props} />);

export {
  TitleTypography,
  SubTitleTypography,
  LargeTypography,
  SubLargeTypography,
  TableHeaderTypography
};
