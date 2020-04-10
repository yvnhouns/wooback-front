import React from "react";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import CssBaseline from "@material-ui/core/CssBaseline";
import SimpleSelctor from "../../components/SimpleSelectorMUI";
import { NumberTextField } from "../../components/TextFieldMUI";
import { makeStyles } from "@material-ui/core/styles";
import FormValidator, {
  defaultSuscriptioin,
} from "../../components/FormValidator";
import Suspenser from "../../components/Suspenser";
import Validation from "./ValidationButon";
import { collections } from "../container/constants";

const Form = ({
  initialValues,
  loading,
  initializeSetting,
  success,
  onSubmit,
  ...restProps
}) => {
  const classes = useStyles();

  const formulaire = ({ values }) => (
    <Grid
      container
      spacing={1}
      direction="row"
      justify="center"
      alignItems="flex-start"
    >
      <Grid item xs={12}>
        <SimpleSelctor
          labelId={values.collection}
          classes={classes}
          name="collection"
          values={collections}
          label="Collection à importer"
        />
        <br />
        <Divider />
      </Grid>

      <Grid item sm={6} xs={12}>
        <NumberTextField
          className={classes.textField}
          name="per_page"
          label={`Nombre de ${values.collection} par bande`}
          type="number"
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <NumberTextField
          className={classes.textField}
          name="page_count"
          label="Nombre de bande"
          type="number"
        />
      </Grid>

      <Grid item sm={6} xs={12}>
        <NumberTextField
          className={classes.textField}
          name="page"
          label="Débuter l'importation à partir de :"
          type="number"
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <NumberTextField
          className={classes.textField}
          name="frequence"
          label="Nombre de réccupération simultanées"
          type="number"
        />
      </Grid>

      <Grid item sm={6} xs={12}>
        <SimpleSelctor
          labelId={values.status}
          classes={classes}
          name="orderBy"
          values={["id", "name"]}
          label="Ordonné par"
        />
      </Grid>

      <Grid item sm={6} xs={12}>
        <SimpleSelctor
          labelId={values.status}
          classes={classes}
          name="order"
          values={["asc", "desc"]}
          label="Ordre"
        />
      </Grid>
    </Grid>
  );

  const contents = ({
    form: {
      mutators: { push, pop },
    },
    form,
    submitting,
    pristine,
    handleSubmit,
    valid,
    dirty,
    values,
    ...restProps
  }) => {
    return (
      <>
        <CssBaseline />
        <div
          style={{
            maxHeight: "80vh",
          }}
        >
          <Suspenser height={100}>{formulaire({ values })}</Suspenser>
          <Validation
            form={form}
            submitting={submitting}
            valid={valid}
            pristine={pristine}
            classes={classes}
            loading={loading}
            success={success}
          />
        </div>
      </>
    );
  };

  return (
    <>
      <FormValidator
        onSubmit={onSubmit}
        initialValues={initialValues}
        subscription={{
          values: true,
          ...defaultSuscriptioin,
        }}
        // validate={React.useCallback(() => validation, [])}
        contents={contents}
      />
    </>
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

const useStyles = makeStyles((theme) => ({
  paper: {
    height: "600px",
    padding: theme.spacing(2, 4),
  },
}));
