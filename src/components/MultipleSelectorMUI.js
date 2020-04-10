/* eslint-disable no-use-before-define */
import React from "react";
import { Checkbox as MuiCheckbox } from "@material-ui/core";
import { Autocomplete } from "mui-rff";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

const SelectorField = ({
  value,
  handleChange,
  labelText,
  optionFieldName = "name",
  values,
  name,
  optionRender,
  className,
  label,
  placeholder,
  variant = "outlined",
  fullWidth = true,
  inputProps,
  labelWidth,
  inputLabel,
  getOptionLabel,
  getOptionValue,
  selectedValues,
  classes = {},
  addButton,
  defaultOption = false,
  ...props
}) => {
  const render = optionRender
    ? optionRender
    : (option, { selected }) => (
        <>
          <MuiCheckbox style={{ marginRight: 8 }} checked={selected} />
          {option[`${optionFieldName}`]}m
        </>
      );

  const renderOption = defaultOption === true ? {} : { renderOption: render };
  const optionLabel = getOptionLabel
    ? getOptionLabel
    : (option) => option[`${optionFieldName}`];

  const optionValue = getOptionValue ? getOptionValue : (option) => option;

  return (
    <>
      {values && (
        <>
          <Autocomplete
            name={name}
            multiple
            disableCloseOnSelect
            options={values}
            noOptionsText="aucun resultat"
            getOptionLabel={optionLabel}
            getOptionValue={optionValue}
            style={{ width: "100%" }}
            {...renderOption}
            value={selectedValues}
            getOptionSelected={(option, value) => option.name === value.name}
            // onChange={(event, values) => handlenativeChange(event, values)}
            //renderInput={params => <TextField {...params} label={labelText} />}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                className={className}
                placeholder={placeholder}
                variant={variant}
                margin="dense"
                fullWidth={fullWidth}
                {...inputProps}
              />
            )}
          />
          {addButton && (
            <Box display="flex" width="100%">
              <Box flexGrow={1}></Box>
              <Box>{addButton}</Box>
            </Box>
          )}
        </>
      )}
    </>
  );
};

// export default React.memo(SelectorField, isEqual);
export default SelectorField;
