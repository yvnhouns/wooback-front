import React from "react";
import Typography from "@material-ui/core/Typography";
const LabelText = ({ children, ...props }) => {
  return (
    <Typography style={{ display: "inline" }} variant="body2" {...props}>
      {children}
    </Typography>
  );
};

const ValueText = ({ children, ...props }) => {
  return (
    <Typography style={{ display: "inline" }} variant="subtitle2" {...props}>
      {children}
    </Typography>
  );
};

export { LabelText, ValueText };
