import React, { lazy } from "react";
import SuspensePaper from "../../components/SuspensePaper";
import Suspenser from "../../components/Suspenser";
import { TitleTypography } from "../../components/assets";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import SimpleSelctor from "../../components/SimpleSelectorMUI";

import { FormSpy } from "react-final-form";
import {
  SimpleTextField,
  NumberTextField,
  PriceTextField,
} from "../../components/TextFieldMUI";
import Checkboxes from "../../components/CheckBoxLineMui";

const CatgoriesFields = lazy(() =>
  import("../../Categories/components/CatgoriesSelectorMui")
);

const Description = lazy(() => import("./Description"));

const Images = lazy(() => import("./ImagesLine"));

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

          <Suspenser count={2}>
            <Description classes={classes} />
          </Suspenser>
        </SuspensePaper>

        <SuspensePaper>
          <FormSpy subscription={{ values: true }}>
            {({ values }) => {
              return (
                <CatgoriesFields
                  classes={classes}
                  className={classes.TextField}
                  sourceCategories={categories}
                  selectedValues={values.categories || []}
                />
              );
            }}
          </FormSpy>
        </SuspensePaper>

        <SuspensePaper>
          <FormSpy subscription={{ values: true }}>
            {({ values }) => {
              return <Images tileData={values.images || []} />;
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
