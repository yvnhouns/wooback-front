import React, { useState } from "react";
import { SubLargeTypography, LargeTypography } from "../../components/assets";
import FormValidator from "../../components/FormValidator";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, InputAdornment } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import MailIcon from "@material-ui/icons/Mail";
import { SimpleTextField, PasswordField } from "../../components/TextFieldMUI";
import useSWR, { trigger } from "swr";
import LinearProgress from "@material-ui/core/LinearProgress";
import CheckBoxLine from "../../components/CheckBoxLine";

const Compte = ({
  user,
  fetcher,
  updateUser,
  getUserInfoUrl,
  alertState: { setError, setSuccess },
}) => {
  const init = {
    loading: false,
    passwordChange: false,
  };

  const url = getUserInfoUrl(user._id);

  // eslint-disable-next-line no-unused-vars
  const { data: profile } = useSWR(url, fetcher, {
    initialData: user,
    suspense: true,
    revalidateOnFocus: false,
  });

  const [layoutHandler, setLayoutHandler] = useState(init);

  const classes = useStyles();
  const { loading, passwordChange } = layoutHandler;
  const onSubmit = async (values) => {
    if (!passwordChange) {
      values.password = undefined;
      values.newPassword = undefined;
      values.confirmation = undefined;
    }

    updateUser(values, ({ error, success }) => {
      error && setError(error);
      !error && setSuccess(" Votre compte a mise à jour avec succès ");
      setLayoutHandler({ ...layoutHandler, loading: false });
      trigger(url);
    });
  };

  const passwordField = (values) => (
    <>
      <Grid className={classes.values} item xs={12}>
        <CheckBoxLine
          value={passwordChange}
          handleChange={() => {
            setLayoutHandler({
              layoutHandler,
              passwordChange: !passwordChange,
            });
          }}
          label="Changement de mot de passe"
        />
      </Grid>

      {passwordChange && (
        <>
          <Grid item xs={12}>
            <PasswordField
              name="password"
              value={values.password}
              placeholder="Mot de passe"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PasswordField
              name="newPassword"
              value={values.newPassword}
              placeholder="Nouveau mot de passe"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PasswordField
              name="confirmation"
              value={values.confirmation}
              placeholder="Confirmer le nouveau mot de passe"
            />
          </Grid>
        </>
      )}
    </>
  );

  const generalFiels = (values) => (
    <>
      <Grid item xs={12} sm={6}>
        <SimpleTextField label="Prenom" name="prenom" required={true} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <SimpleTextField label="nom" name="nom" required={true} />
      </Grid>
      <Grid item xs={12}>
        <SimpleTextField
          label="Nom affiché"
          name="nomAfficher"
          required={true}
          helperText="Indique comment votre nom apparaîtra dans la section relative au compte et dans les avis"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item xs={12} zeroMinWidth sm={6}>
        <SimpleTextField
          type="email"
          label={"Email"}
          name="email"
          required={true}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <SimpleTextField
          placeholder="Téléphone"
          label="Téléphone"
          required={true}
          name="phone"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneAndroidIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    </>
  );
  const contents = ({ form, submitting, pristine, handleSubmit, values }) => (
    <Grid
      container
      spacing={2}
      direction="row"
      justify="center"
      alignItems="flex-start"
    >
      {generalFiels(values)}
      {passwordField(values)}

      <Grid
        container
        item
        direction="row"
        justify="flex-end"
        alignItems="center"
        xs={12}
      >
        <Button
          type="button"
          variant="contained"
          onClick={form.reset}
          disabled={submitting || pristine}
          className={classes.button}
        >
          Initialise
        </Button>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={submitting}
          className={classes.button}
        >
          Enregistrer
        </Button>
      </Grid>
    </Grid>
  );

  return (
    <>
      {loading && <LinearProgress />}

      <div className={classes.title}>
        <LargeTypography> Compte </LargeTypography>
        <SubLargeTypography>
          Modifier les paramètres de votre compte
        </SubLargeTypography>
      </div>
      <Divider className={classes.divider} light={true} />

      <FormValidator
        onSubmit={onSubmit}
        initialValues={getInitialValue(profile ? profile : user)}
        validate={validate}
        contents={contents}
      />
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  title: {
    margin: theme.spacing(2, 0, 1, 0),
  },
  divider: {
    margin: theme.spacing(1, 0),
  },
}));

const validate = (values) => {
  const errors = {};
  if (!values.nom) {
    errors.nom = "Important";
  }
  if (!values.prenom) {
    errors.prenom = "Important";
  }
  if (!values.email) {
    errors.email = "Important";
  }
  if (values.password) {
    let t = true;

    if (!values.newPassword) {
      errors.newPassword = "Important";
      t = false;
    }
    if (!values.confirmation) {
      errors.confirmation = "Important";
      t = false;
    }

    if (t && values.confirmation !== values.newPassword) {
      errors.confirmation =
        "le mot de passe doit être identique au nouveau mot de passe";
    }
  }
  return errors;
};

export default Compte;

const getInitialValue = (profile) => ({
  nom: profile.nom,
  prenom: profile.prenom,
  email: profile.email,
  nomAfficher: profile.nomAfficher,
  phone: profile.phone,
  password: "",
  newPassword: "",
  confirmation: "",
});
