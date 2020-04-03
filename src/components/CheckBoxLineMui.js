import React from "react";
import { Checkboxes } from "mui-rff";

export default ({ name, label, variant = "outlined", ...restProps }) => {
  return (
    <Checkboxes
      color="primary"
      variant={variant}
      name={name}
      formControlProps={{ margin: "none", style: { fontWeight: "600" } }}
      data={{
        label: label,
        value: true
      }}
      {...restProps}
    />
  );
};
