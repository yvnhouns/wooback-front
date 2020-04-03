import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import { Debug } from "mui-rff";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormValidator from "../../components/FormValidator";
import Suspenser from "../../components/Suspenser";
import ValidationButton from "./ValidationButton";
import useSWR from "swr";
import { readPostUrl } from "../container/urls";

import Form from "./Form";

const ProductForm = ({
  submitProduct,
  setCurrentViewerTitleAndAction,
  newProduct = true,
  initialPost = initialValue,
  categories,
  fecther,
  id,
  nextStep
}) => {
  const [validateHandler, setValidateHandler] = useState({
    success: false,
    submiting: false
  });

  const url = readPostUrl();
  const {
    data: { post }
  } = useSWR(url, fecther, {
    suspense: false,
    initialData: { post: initialPost },
    refreshWhenOffline: false,
    revalidateOnFocus: false
  });

  const classes = useStyles();

  const onSubmit = async (values, form) => {
    setValidateHandler({ submiting: true, success: false });
    const modified = form.getState().modified;
    const operation = newProduct ? "create" : "update";
    const data = {};

    for (let [key, value] of Object.entries(modified)) {
      if (value) {
        data[key] = values[key];
      }
    }

    const formdData = {
      _id: post._id,
      value: { ...data, id: post.content.id }
    };
    submitProduct &&
      submitProduct(operation, formdData, data => {
        setValidateHandler({ submiting: false, success: true });
        nextStep({ data, operation });
      });
  };

  const { success, submiting } = validateHandler;

  const contents = ({
    form: {
      mutators: { push, pop }
    },
    form,
    submitting,
    pristine,
    handleSubmit,
    valid,
    dirty,
    modified,
    ...restProps
  }) => {
    return (
      <>
        <CssBaseline />
        <div
          style={{
            maxHeight: "80vh"
          }}
        >
          <Suspenser height={100}>
            <Form classes={classes} categories={categories} />
          </Suspenser>
          <ValidationButton
            form={form}
            submitting={submitting}
            valid={valid}
            pristine={pristine}
            rootStyle={classes.submitRow}
            classes={classes}
            modified={modified}
            submiting={submiting}
            success={success}
          />
          {/* <Debug /> */}
        </div>
      </>
    );
  };

  return (
    <>
      <FormValidator
        onSubmit={onSubmit}
        initialValues={format(post.content)}
        // validate={React.useCallback(() => validation, [])}
        contents={contents}
      />
    </>
  );
};

export default ProductForm;

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    textAlign: "center"
  },
  textField: {
    // margin: theme.spacing(1, 0)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  paper: {
    width: "100%",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  actionButtonHelper: {
    padding: "10px 8px"
  },
  tabLigthRoot: {
    maxHeight: "300px",
    display: "inline-block",
    position: "relative"
  },
  submitRow: {
    // position: "fixed",
    bottom: 0,
    top: "auto",
    width: "100%"
    // zIndex: 1
  }
}));

const initialValue = {
  content: {
    sku: "",
    ugs: "",
    name: "",
    featured: false,
    short_description: "",
    description: "",
    manage_stock: true,
    stock_quantity: "",
    regular_price: "",
    categories: "",
    images: "",
    type: "",
    sale_price: ""
  }
};

const format = item => {
  return {
    ...item,
    regular_price: parseInt(item.regular_price || "0"),
    sale_price: parseInt(item.sale_price || "0")
  };
};
