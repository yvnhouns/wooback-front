import React from "react";
import MultipleSelector from "../../../components/MultipleSelector";
import { wooStatusTranslate, localStatus } from "../../container/utils";
import { LOCAL_STATUS, WOO_STATUS } from "../../container/constants";
const WooStatusSelector = ({
  fullWidth = true,
  variant,
  placeholder,
  helperText,
  labelText,
  handleChange,
  value,
  type = WOO_STATUS,
}) => {
  const values =
    type === WOO_STATUS
      ? wooStatusTranslate
      : type === LOCAL_STATUS
      ? localStatus
      : "";

  const onChange = (event) => {
    handleChange(event.target.value);
  };

  return (
    <>
      <MultipleSelector
        fullWidth={fullWidth}
        // value={value}
        handleChange={onChange}
        labelText={labelText}
        placeholder={placeholder}
        values={values}
        multiple={false}
        defaultOption={true}
        variant={variant}
        helperText={helperText}
        getOptionLabel={(option) => option.label}
        disableCloseOnSelect={false}
      />
    </>
  );
};

const isEqual = (prev, next) => {
  return (
    JSON.stringify({
      value: prev && prev.value,
      type: prev && prev.type,
    }) ===
    JSON.stringify({
      value: next.value,
      type: next.type,
    })
  );
};

export default React.memo(WooStatusSelector, isEqual);

// const useStyles = makeStyles((theme) => ({
//   label: {
//     //  marginTop:"8px",
//     //  marginLeft:"4px",
//     height: "32px",
//   },
//   path: {
//     maxWidth: "fit-content",
//     marginLeft: "24px",
//     fontSize: "12px",
//     background: `${theme.palette.background.default}`,
//     color: `${theme.palette.text.default}`,
//     height: "20px",
//   },
// }));
