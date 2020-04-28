import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

const SimpleTextField = ({
  className,
  value,
  handleChange,
  name,
  label,
  placeholder,
  variant = "standard",
  fullWidth = true,
  helperText,
  ...props
}) => (
  <TextField
    placeholder={placeholder}
    className={className}
    type="text"
    value={value}
    variant={variant}
    fullWidth={fullWidth}
    onChange={handleChange}
    margin="dense"
    name={name}
    label={label}
    {...props}
    helperText={helperText}
  />
);

const PriceTextField = ({
  className,
  name,
  label,
  placeholder,
  variant = "standard",
  fullWidth = true,
  ...props
}) => (
  <TextField
    type="number"
    variant={variant}
    placeholder={placeholder}
    margin="dense"
    fullWidth={fullWidth}
    className={className}
    name={name}
    label={label}
    InputProps={{
      startAdornment: <InputAdornment position="start">CFA</InputAdornment>,
    }}
    {...props}
  />
);

export { SimpleTextField, PriceTextField };
