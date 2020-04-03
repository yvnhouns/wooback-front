import React from "react";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default ({ handleChange, value, label, ...restProps }) => {
  return (
    <FormControlLabel
      // style={{ /*margin: "auto", */ paddingTop: " 15px" }}
      control={
        <Checkbox
          onChange={handleChange}
          value={value}
          // color="primary"
        />
      }
      label={label}
      {...restProps}
    />
  );
};
