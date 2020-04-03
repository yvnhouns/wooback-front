import React from "react";
import { TextField } from "mui-rff";
import InputAdornment from "@material-ui/core/InputAdornment";

const SimpleTextField = ({
  className,
  name,
  label,
  placeholder,
  variant = "outlined",
  fullWidth = true,
  ...props
}) => (
  <TextField
    placeholder={placeholder}
    className={className}
    type="text"
    variant={variant}
    fullWidth={fullWidth}
    margin="dense"
    // size="small"
    name={name}
    label={label}
    {...props}
  />
);

const PriceTextField = ({
  className,
  name,
  label,
  placeholder,
  variant = "outlined",
  fullWidth = true,
  ...props
}) => (
  <TextField
    size="small"
    type="number"
    variant={variant}
    placeholder={placeholder}
    margin="dense"
    fullWidth={fullWidth}
    className={className}
    name={name}
    label={label}
    InputProps={{
      startAdornment: <InputAdornment position="start">CFA</InputAdornment>
    }}
    {...props}
  />
);

const NumberTextField = ({
  className,
  name,
  label,
  type = "number",
  placeholder,
  adornment,
  adornmentPosition = "start",
  adornmentStyle = {},
  variant = "outlined",
  fullWidth = true,

  ...props
}) => {
  const adorn = adornment
    ? {
        InputProps: {
          startAdornment: (
            <InputAdornment style={adornmentStyle} position={adornmentPosition}>
              {adornment}
            </InputAdornment>
          )
        }
      }
    : {};

  return (
    <TextField
      size="small"
      type={type}
      variant={variant}
      placeholder={placeholder}
      margin="dense"
      fullWidth={fullWidth}
      className={className}
      name={name}
      label={label}
      {...adorn}
      {...props}
    />
  );
};


export {
  SimpleTextField,
  PriceTextField,
  NumberTextField
};
