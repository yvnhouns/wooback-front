import React from "react";
import SuspensePaper from "../../components/SuspensePaper";
import { TitleTypography } from "../../components/assets";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import SimpleSelctor from "../../components/SimpleSelectorMUI";

import { FormSpy } from "react-final-form";
import Images from "./ImagesLine";
import {
  SimpleTextField,
  NumberTextField,
  PriceTextField,
} from "../../components/TextFieldMUI";
import Checkboxes from "../../components/CheckBoxLineMui";

const Form = ({ classes, categories, ...restProps }) => {
  return (
    <Grid
      container
      spacing={1}
      direction="row"
      justify="center"
      alignItems="flex-start"
    >
      <Grid container item sm={6} xs={12}>
        <SuspensePaper>
          <SimpleTextField
            placeholder="Libeller"
            className={classes.textField}
            name="name"
            label="Libeller"
          />
          <SimpleTextField
            placeholder="Description"
            className={classes.textField}
            name="description"
            multiline
            rows="5"
            label="Description"
          />
          <SimpleTextField
            placeholder="Description complete"
            className={classes.textField}
            name="short_description"
            multiline
            rows="5"
            label="Description complete"
          />
          Cataegories
          {/* <PostSelectorField
          classes={classes}
          className={classes.TextField}
          selectedValues={categories}
          type={"Categories"}
          title={"Categories"}
          name={"categories"}
          placeholder={"Rechercher ... "}
          label={"Categories"}
          data={categories}
        /> */}
        </SuspensePaper>

        <SuspensePaper>
          <FormSpy subscription={{ values: true }}>
            {({ values }) => {
              return <Images tileData={values.images} />;
            }}
          </FormSpy>
        </SuspensePaper>
      </Grid>
      <Grid item xs={12} sm={5}>
        <SuspensePaper>
          <TitleTypography>Tarification</TitleTypography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <PriceTextField
                placeholder="Prix"
                className={classes.textField}
                name="price"
                label="Prix"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PriceTextField
                placeholder="Tarif régulier"
                className={classes.textField}
                name="regular_price"
                label="Tarif régulier"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <PriceTextField
                placeholder="Prix de vente"
                className={classes.textField}
                name="sale_price"
                label="Prix de vente"
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Checkboxes name="featured" label="Mettre en avant" />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormSpy subscription={{ values: true }}>
                {({ values }) => (
                  <SimpleSelctor
                    labelId={values.status}
                    classes={classes}
                    name="status"
                    values={["draft", "pending", "private", "publish"]}
                    label="Status"
                    helper="status"
                  />
                )}
              </FormSpy>
            </Grid>
          </Grid>
        </SuspensePaper>

        <SuspensePaper>
          <TitleTypography>Stockage</TitleTypography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <SimpleTextField
                placeholder="SKU, Isbn .... "
                className={classes.textField}
                name="sku"
                label="isbn"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SimpleTextField
                placeholder="Ugs"
                className={classes.textField}
                name="ugs"
                label="Ugs"
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Divider />
              <Checkboxes name="manage_stock" label="Gérer le stock ?" />

              <FormSpy subscription={{ values: true }}>
                {({ values }) => {
                  return !values.manage_stock ? (
                    <SimpleSelctor
                      labelId={values.status}
                      classes={classes}
                      name="stock_status"
                      values={["instock", "outofstock", "onbackorder"]}
                      label="Status du stock"
                      helper="Status du stock"
                    />
                  ) : (
                    <NumberTextField
                      className={classes.textField}
                      name="stock_quantity"
                      label="Stock"
                      helperText="Stock, si vide donc stock infini"
                      type="number"
                    />
                  );
                }}
              </FormSpy>
            </Grid>
          </Grid>
        </SuspensePaper>
      </Grid>
    </Grid>
  );
};

export default Form;

// sku,
// ugs,
// name,
// featured,
// short_description,
// description,
// manage_stock,
// stock_quantity,
// regular_price,
// categories,
// images,
// type,
// sale_price
