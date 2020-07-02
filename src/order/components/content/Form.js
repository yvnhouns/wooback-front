import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import purple from "@material-ui/core/colors/purple";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import EditIcon from "@material-ui/icons/Edit";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import CssBaseline from "@material-ui/core/CssBaseline";
import ReceiptIcon from "@material-ui/icons/Receipt";
import ListSkeleton from "../../../components/ListSkeleton";
import { dateToText } from "../../../utils";
import IconButtonMedia from "../../../components/IconButtonMedia";
import StatusDialog from "../localStatus";
import {
  TitleTypography,
  LargeTypography,
} from "../../../components/Typography";
import SuspensePaper from "../../../components/SuspensePaper";
import {
  ACTION_UPDATE_WOO_STATUS,
  ACTION_VIEW_WOO_STATUS,
  ACTION_VIEW_ORDER_AMOUNT,
} from "../../container/accesses";

import {
  LOCAL_STATUS_UPDATE,
  WOO_STATUS_UPDATE,
} from "../../container/constants";

import { getWooStatusTranslate } from "../../container/utils";

const Product = React.lazy(() => import("./product"));

const Form = ({
  value,
  updateStatus,
  fetcher,
  getStatusListUrl,
  refresh,
  checkPermission,
  ...props
}) => {
  const classes = useStyles();

  const allow_viewAmountStatus = checkPermission(ACTION_VIEW_ORDER_AMOUNT);
  const allow_viewWooStatus = checkPermission(ACTION_VIEW_WOO_STATUS);
  const allow_updateWooStatus = checkPermission(ACTION_UPDATE_WOO_STATUS);

  const [state, setState] = React.useState({
    statusOpen: false,
    localisation: false,
  });
  const { statusOpen, localisation } = state;

  const {
    _id,
    id,
    total,
    // date_created,
    date_completed,
    date_modified,
    customer,
    shipping,
    shipping_lines = [],
    customer_note,
    billing,
    customer_id,
    localStatus,
    status,
  } = value;

  const { method_title, total: shippingTotal } = shipping_lines[0] || {};
  const handleOpenStatus = (local, value) => {
    setState((state) => ({
      ...state,
      localisation: local,
      statusOpen: !statusOpen,
    }));
  };

  const getCurrentStatusToUpdate = () => {
    return localisation === WOO_STATUS_UPDATE ? status : localStatus;
  };

  const statusOpener = () => (
    <StatusDialog
      submit={updateStatus(localisation, { _id, id })}
      fetcher={fetcher}
      externalOpen={statusOpen}
      setTExternalOpen={(value) => {
        handleOpenStatus("");
        // if(value)
        refresh();
      }}
      status={getCurrentStatusToUpdate()}
      getListUrl={getStatusListUrl(localisation)}
      localisation={localisation}
    />
  );

  const showTitle = () => {
    const translate = getWooStatusTranslate(status);

    return (
      <>
        {" "}
        <Box display="flex" alignItems="center" width="100%">
          <Box alignSelf="center" flexGrow={1}>
            <LargeTypography className={classes.inline}>
              {" "}
              {`Commande ${id}`}{" "}
            </LargeTypography>

            {allow_viewWooStatus && (
              <ValueText
                className={classes.inline}
                style={{ color: translate.color }}
              >
                {translate.label}
              </ValueText>
            )}
          </Box>
          {allow_updateWooStatus && (
            <IconButtonMedia
              icon={<EditIcon fontSize="large" color="action" />}
              onClick={() => handleOpenStatus(WOO_STATUS_UPDATE)}
              textButtonProps={{ label: "Modifier l'état de la commande" }}
              size="medium"
            />
          )}
        </Box>
        <Grid container item>
          {allow_viewAmountStatus && (
            <Grid item sm={4} xs={6}>
              <TitleTypography className={classes.total}>
                <strong> {total} </strong> Fcfa
              </TitleTypography>
            </Grid>
          )}

          <Grid item sm={4} xs={6}>
            <LabelText className={classes.inline}> Date : </LabelText>
            <ValueText variant="subtitle2">
              {dateToText(date_completed)} Fcfa
            </ValueText>
          </Grid>

          <Grid item sm={4} xs={12}>
            <LabelText className={classes.inline}>
              {" "}
              Dernière modification :{" "}
            </LabelText>
            <ValueText variant="subtitle2">
              {dateToText(date_modified)} Fcfa
            </ValueText>
          </Grid>
        </Grid>
        {statusOpen && statusOpener()}
      </>
    );
  };

  const showCustomer = () => {
    const { first_name, last_name, email } = customer || shipping;

    return (
      <SuspensePaper>
        <Box display="flex" alignItems="center" width="100%">
          <Box marginRight={2}>
            <Avatar className={classes.purple}>
              {(first_name || "").charAt(0)} {(last_name || "").charAt(0)}
            </Avatar>
            <Divider orientation="vertical" flexItem />
          </Box>
          <Box flexGrow={1}>
            <TitleTypography> {`Client #${customer_id}`} </TitleTypography>

            <Typography variant="subtitle2">
              {first_name} {last_name}{" "}
            </Typography>
            <Typography variant="subtitle2"> {email}</Typography>
          </Box>
        </Box>
      </SuspensePaper>
    );
  };

  const showBilling = () => {
    const {
      first_name: b_first_name,
      last_name: b_last_name,
      postcode: b_postcode,
      address_1: b_address_1,
      address_2: b_address_2,
      city: b_city,
      state: b_state,
      phone,
      email: b_email,
    } = billing;

    const billing_name = b_first_name + b_last_name;
    const billing_address = `${b_postcode}  ${b_address_1}  ${b_address_2}  ${b_city}  ${b_state}`;

    return (
      billing && (
        <SuspensePaper>
          <Box alignItems="center" display="flex" width="100%">
            <Box mt={1} mr={1}>
              <ReceiptIcon />
            </Box>
            <Box flexGrow={1}>
              <TitleTypography className={classes.inline}>
                Facturation{" "}
              </TitleTypography>
            </Box>
          </Box>

          <Grid container>
            <Grid item xs={12}>
              <LabelText> Nom : </LabelText>
              <ValueText> {billing_name} </ValueText>
            </Grid>

            <Grid item xs={12}>
              <LabelText> Addresse : </LabelText>
              <ValueText> {billing_address} </ValueText>
            </Grid>

            <Grid item xs={12}>
              <LabelText> Addresse messagerie: </LabelText>
              <ValueText> {b_email} </ValueText>
            </Grid>

            <Grid item xs={12}>
              <LabelText> Contact téléphonique: </LabelText>
              <ValueText> {phone} </ValueText>
            </Grid>
          </Grid>
        </SuspensePaper>
      )
    );
  };

  const showProduct = () => {
    return (
      <React.Suspense fallback={<ListSkeleton count={1} />}>
        <Product
          handleUpdateStatus={() => handleOpenStatus(LOCAL_STATUS_UPDATE)}
          value={value}
          checkPermission={checkPermission}
        />
      </React.Suspense>
    );
  };

  const showShipping = () => {
    const {
      first_name: shipping_FirstName,
      last_name: shipping_LasrName,
      address_1,
      city,
      postcode,
      company,
      address_2,
      state,
      country,
    } = shipping || {};

    const addressText = `${shipping_FirstName} ${shipping_LasrName},  ${company} ${address_1} ${address_2}, ${postcode} ${city}  ${country}  ${state}`;

    return (
      <SuspensePaper>
        <Box alignItems="center" display="flex" width="100%">
          <Box mt={1} mr={1}>
            <LocalShippingIcon />
          </Box>
          <Box flexGrow={1}>
            <TitleTypography className={classes.inline}>
              Livraison
            </TitleTypography>
          </Box>
        </Box>

        <Grid container>
          <Grid item xs={6}>
            <LabelText> Méthode : </LabelText>
            <ValueText> {method_title} </ValueText>
          </Grid>
          <Grid item xs={6}>
            <LabelText> Montant : </LabelText>
            <ValueText> {shippingTotal} </ValueText>
          </Grid>

          <Grid item xs={12}>
            <LabelText> Addresse : </LabelText>
            <ValueText> {addressText} </ValueText>
          </Grid>

          <Grid item xs={12}>
            <LabelText> Note : </LabelText>
            <ValueText> {customer_note} </ValueText>
          </Grid>
        </Grid>
      </SuspensePaper>
    );
  };

  return (
    <Grid
      container
      spacing={1}
      direction="row"
      alignItems="flex-start"
      className={classes.root}
    >
      <CssBaseline />
      {showTitle()}
      <Grid container item sm={6} xs={12}>
        {showCustomer()}
        {showBilling()}

        {showShipping()}
      </Grid>
      <Grid container item sm={6} xs={12}>
        {showProduct()}
      </Grid>
    </Grid>
  );
};

export default React.memo(Form);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: theme.spacing(1),
  },
  inline: {
    display: "inline",
  },
  status: {
    color: "chocolate",
  },
  total: {
    color: purple[500],
  },
}));

const LabelText = ({ children, ...props }) => {
  return (
    <Typography style={{ display: "inline" }} variant="body2" {...props}>
      {children}
    </Typography>
  );
};

const ValueText = ({ children, ...props }) => {
  return (
    <Typography style={{ display: "inline" }} variant="subtitle2" {...props}>
      {children}
    </Typography>
  );
};
