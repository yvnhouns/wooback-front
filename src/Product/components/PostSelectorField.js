import React, { useState, useEffect } from "react";
import MultipleSelectorMUI from "../../components/MultipleSelectorMUI";
import useSWR from "swr";
import AddIcon from "@material-ui/icons/Add";
import { ButtonWithIcon } from "../../components/assets";

//import PostDialog from "./PostDialog";

export default ({
  fullWidth = true,
  inputProps,
  variant,
  className,
  selectedValues,
  classes = {},
  type,
  title,
  name,
  placeholder,
  label,
  data
}) => {
  const [select, setSelect] = useState([...selectedValues]);

  useEffect(() => {
    setSelect([...selectedValues]);
  }, [selectedValues]);

  const eventButton = handleClick => (
    <ButtonWithIcon
      style={{ margin: "0px" }}
      icon={<AddIcon />}
      className={classes.button}
      variant="text"
      color="primary"
      onClick={handleClick && handleClick}
    >
      AJouter
    </ButtonWithIcon>
  );
  const handleNewPost = val => {
    data.posts.push(val);
    selectedValues.push(val);
    setSelect([...new Set([...select, val])]);
  };

  return (
    <>
      <MultipleSelectorMUI
        name={name}
        className={className}
        variant={variant}
        fullWidth={fullWidth}
        inputProps={inputProps}
        optionFieldName="name"
        getOptionValue={option => option}
        placeholder={placeholder}
        label={label}
        values={data.posts}
        selectedValues={select}
        addButton={
          <> Ajouter </>
          // <PostDialog
          //   submitSelected={handleNewPost}
          //   type={type}
          //   title={title}
          //   eventButton={eventButton}
          // />
        }
      />
    </>
  );
};
