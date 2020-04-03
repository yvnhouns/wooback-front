import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import { makeStyles } from "@material-ui/styles";

import Select from "@material-ui/core/Select";
export default ({
  classes,
  inputLabel,
  value,
  handleChange,
  labelWidth,
  values,
  label,
  labelId,
  variant = "outlined",
  helper,
  fullWidth = true
}) => {
  const nativeClasses = useStyles();

  return (
    <FormControl
      variant={variant}
      fullWidth={fullWidth}
      // className={classes.textField}
      margin="dense"
      className={nativeClasses.formControl}
    >
      {label && (
        <InputLabel ref={inputLabel} htmlFor={labelId}>
          {label}
        </InputLabel>
      )}
      <Select
        margin="dense"
        value={value}
        onChange={handleChange}
        labelWidth={labelWidth}
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
      {helper && <FormHelperText>{helper}</FormHelperText>}
    </FormControl>
  );
};

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));
