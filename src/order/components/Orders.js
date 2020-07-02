import React from "react";
// import { getProductsApi } from "./container/api";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import context from "../../context/AdminContext";
import List from "./List";

import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SearchField from "../../components/SearchField";
import ListSkeleton from "../../components/ListSkeleton";
import DatesRanges from "./FilterSetting/DatesRanges";

import {
  ACTION_FILTER_BY_LOCAL_STATUS,
  ACTION_FILTER_BY_WOO_STATUS,
} from "../container/accesses";

import {
  LOCAL_STATUS,
  WOO_STATUS,
  LOCAL_STATUS_UPDATE,
  WOO_STATUS_UPDATE,
} from "../container/constants";
import WooStatusSelector from "./localStatus/statusSelector";

const Orders = ({
  setCurrentViewTitle,
  setCurrentViewAction,
  addNextComponent,
  setCurrentViewerTitleAndAction,
  alertState,
  previous,
  selector = false,
  handleSelected,
  selected = [],
  multiSelector,
  name = "school",
  affichageName = "Ecole",
  ...props
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const adminContext = React.useContext(context);
  const inputState = {
    addNextComponent,
    setCurrentViewerTitleAndAction,
  };

  const {
    getFetcher,
    getReadUrl,
    getOrderStatus,
    getWooOrderStatus,
    update,
    getPartialSearch,
    updateStatus,
    updateWooStatus,
    checkPermission,
  } = adminContext.order;

  const alloWooStatusFilter = checkPermission(ACTION_FILTER_BY_WOO_STATUS);
  const alloLocalStatusFilter = checkPermission(ACTION_FILTER_BY_LOCAL_STATUS);

  const { [`${name}`]: nativeAccesses } = adminContext.permission;

  const [searchData, setSearchData] = React.useState({
    search: "",
    searchInFields: [
      "customer_data.email",
      "customer_data.first_name",
      "customer_data.last_name",
      "billing.phone",
      "id",
    ],
    status: undefined,
    localStatus: undefined,
    dates: undefined,
    showFilter: false,
  });

  const { showFilter, localStatus, status } = searchData;

  const getStatusId = (val = {}) => {
    const id = val ? val.id : undefined;
    return id;
  };
  const url = getPartialSearch({
    ...searchData,
    status: getStatusId(status),
    localstatus: getStatusId(localStatus),
    localStatus: undefined,
    showFilter: undefined,
  });

  const fetcher = getFetcher();

  const handleFilter = (name) => (data) => {
    let newValue = {};
    switch (name) {
      case "search":
        const val = data.target.value;
        newValue = { search: val === "" ? undefined : val };
        break;

      case "showFilter":
        newValue = { showFilter: !showFilter };
        break;

      case WOO_STATUS:
        newValue = { status: data };
        break;
      case LOCAL_STATUS:
        newValue = { localStatus: data };
        break;

      case "dates":
        newValue = { dates: data };
        break;

      default:
        newValue = { ...data };
        break;
    }
    setSearchData((searchData) => ({ ...searchData, ...newValue }));
  };

  const getStatusListUrl = (localisation) => () => {
    if (localisation === WOO_STATUS_UPDATE) return getWooOrderStatus();
    else return getOrderStatus();
  };

  const filter = (
    <>
      <Grid container>
        <Grid spacing={1} item container xs={12} sm={6}>
          {alloWooStatusFilter && (
            <Grid item sm={6} xs={12}>
              <WooStatusSelector
                placeholder="woo status"
                labelText="woo status"
                handleChange={handleFilter(WOO_STATUS)}
                value={status}
                fullWidth={true}
                type={WOO_STATUS}
              />
            </Grid>
          )}

          {alloLocalStatusFilter && (
            <Grid item sm={6} xs={12}>
              <WooStatusSelector
                placeholder="local status"
                labelText="local status"
                handleChange={handleFilter(LOCAL_STATUS)}
                fullWidth={true}
                value={localStatus}
                type={LOCAL_STATUS}
              />
            </Grid>
          )}
        </Grid>
        <Grid
          item
          container
          xs={12}
          sm={6}
          justify={!isMobile ? "flex-end" : "center"}
        >
          <DatesRanges handleFilter={handleFilter("dates")} />
        </Grid>
      </Grid>

      <Divider style={{ margin: "6px 0px" }} />
    </>
  );

  const { setError, setSuccess } = selector
    ? { setError: () => {}, setSuccess: () => {} }
    : alertState;

  const performErrorAlert = (error) => {
    const type = typeof error;
    error && type === "string" && setError(error);
  };

  const onUpdate = (val, next) => {
    const { _id } = val;
    update(_id, val, ({ error, data }) => {
      performErrorAlert(error);
      if (!error) {
        setSuccess("Mis à jour avec succès");
        next();
      }
    });
  };

  const onUpdateStatus = (id, value, next) => {
    updateStatus(id, value, (data) => {
      if (data) {
        const { error } = data;
        performErrorAlert(error);
        if (!error) {
          setSuccess("Mis à jour avec succès");
          next();
        }
      }
    });
  };

  const onUpdateWooStatus = (item, value, next) => {
    updateWooStatus(item, value, (data) => {
      if (data) {
        const { error } = data;
        performErrorAlert(error);
        if (!error) {
          setSuccess("Mis à jour avec succès");
          next();
        }
      }
    });
  };

  const onUpdateOrderStatus = (localisation, item) => (value, next) => {
    if (localisation === LOCAL_STATUS_UPDATE)
      onUpdateStatus(item._id, value, next);
    if (localisation === WOO_STATUS_UPDATE)
      onUpdateWooStatus(item, value, next);
  };

  const setCurrentSearch = (val) => {
    setSearchData({ ...searchData, search: val });
  };

  return (
    <>
      <SearchField
        style={{ width: "100%", margin: "8px 0px" }}
        inputFieldProps={{ onChange: handleFilter("search") }}
        handleShowFilter={handleFilter("showFilter")}
      />

      {showFilter && filter}

      <React.Suspense fallback={<ListSkeleton count="50" />}>
        <List
          nativeAccesses={nativeAccesses}
          fetcher={fetcher}
          previous={previous}
          getReadUrl={getReadUrl}
          url={url}
          {...inputState}
          selector={selector}
          handleSelected={handleSelected}
          selected={selected}
          submit={onUpdate}
          setCurrentSearch={setCurrentSearch}
          multiSelector={multiSelector}
          updateStatus={onUpdateOrderStatus}
          getStatusListUrl={getStatusListUrl}
          checkPermission={checkPermission}
        />
      </React.Suspense>
    </>
  );
};

const isEqual = (prev, next) => {
  return (
    JSON.stringify({
      isAuthenticatedUser: prev ? prev.isAuthenticatedUser : undefined,
      selected: prev ? prev.selected : undefined,
    }) ===
    JSON.stringify({
      isAuthenticatedUser: next.isAuthenticatedUser,
      selected: next.selected,
    })
  );
};

export default React.memo(Orders, isEqual);
