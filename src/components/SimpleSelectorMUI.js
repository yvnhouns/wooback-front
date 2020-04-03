import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { Select } from "mui-rff";

export default ({
  inputLabel,
  name,
  labelWidth,
  values,
  label,
  labelId,
  variant = "outlined",
  fullWidth = true,
  ...props
}) => {
  return (
    <Select
      margin="none"
      formControlProps={{ margin: "dense", fullWidth, variant }}
      name={name}
      labelWidth={labelWidth}
      variant={variant}
      inputProps={{
        name: labelId,
        id: labelId
      }}
    >
      {values &&
        values.map((val, index) => (
          <MenuItem key={index} value={val}>
            {val}
          </MenuItem>
        ))}
    </Select>
  );
};
