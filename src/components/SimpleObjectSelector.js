import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

import Select from "@material-ui/core/Select";
export default ({
  classes,
  label,
  inputLabel,
  value,
  handleChange,
  labelWidth,
  values,
  labelField = "name",
  idField = "_id"
}) => {
  return (
    <FormControl
      variant="outlined"
      fullWidth
      className={classes.textField}
      margin="dense"
    >
      <InputLabel ref={inputLabel} htmlFor={label}>
        {label}
      </InputLabel>
      <Select
        margin="dense"
        value={value}
        onChange={handleChange}
        labelWidth={labelWidth}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {values &&
          values.map((val, index) => (
            <MenuItem key={val[`${idField}`]} value={val}>
              {val[`${labelField}`]}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};
