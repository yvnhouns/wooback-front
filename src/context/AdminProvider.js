import React from "react";
import { useReducer } from "reinspect";
import combineReducer from "../utils/combineReducer";
import MainContext from "./AdminContext";
import { performContextInitial } from "../utils";
import useSWR from "swr";

// Auth reducers
import AuthReducer, {
  key as AuthKey,
  init as AuthInit,
} from "../auth/containers/reducer.js";
import AuthPerformances from "../auth/containers/performances";

import managerReducer, {
  key as managerKey,
  init as managerInit,
} from "../manager/containers/reducer.js";
import managerPerformances from "../manager/containers/performances";
import * as managerAccesses from "../manager/containers/accesses";

import userReducer, {
  key as userKey,
  init as userInit,
} from "../user/containers/reducer.js";
import userPerformances from "../user/containers/performances";
import * as userAccesses from "../user/containers/accesses";

import alertReducer, {
  key as alertKey,
  init as alertInit,
} from "../Alert/container/reducer";
import alertPerformances from "../Alert/container/performances";

import importerReducer, {
  key as importerKey,
  init as importerInit,
} from "../Importer/container/reducer";
import importerPerformances from "../Importer/container/performances";
import * as importerAccesses from "../Importer/container/accesses";

import ProductReducer, {
  key as ProductKey,
  init as ProductInit,
} from "../Product/container/reducer";
import ProductPerformance from "../Product/container/performances";
import * as productAccesses from "../Product/container/accesses";

import LayoutReducer, {
  key as LayoutKey,
  init as LayoutInit,
} from "../layout/containers/reducer";
import LayoutPerformance from "../layout/containers/performances";

const HomeProvider = (props) => {
  // initial rootstate

  const initialValue = {
    [AuthKey]: AuthInit,
    [ProductKey]: ProductInit,
    [LayoutKey]: LayoutInit,
    [alertKey]: alertInit,
    [importerKey]: importerInit,
    [managerKey]: managerInit,
    [userKey]: userInit,
    permission: {
      accesses: {
        ...managerAccesses,
        ...userAccesses,
        ...importerAccesses,
        ...productAccesses,
      },
    },
  };

  // root reducer
  const rootReducer = combineReducer({
    [AuthKey]: AuthReducer,
    [ProductKey]: ProductReducer,
    [LayoutKey]: LayoutReducer,
    [alertKey]: alertReducer,
    [importerKey]: importerReducer,
    [managerKey]: managerReducer,
    [userKey]: userReducer,
  });

  // root state and dispatch
  const [state, dispatch] = useReducer(
    rootReducer,
    initialValue,
    (state) => state,
    "rootState"
  );

  // state with dispacth actions

  let initial = {
    ...state,
  };

  const auth = state[AuthKey].isAuthenticatedUser;
  initial = performContextInitial(state, dispatch, initial, [
    { key: AuthKey, Performance: AuthPerformances },
    { key: LayoutKey, Performance: LayoutPerformance },
    { key: alertKey, Performance: alertPerformances },
    {
      key: importerKey,
      Performance: importerPerformances,
      auth,
    },
    {
      key: userKey,
      Performance: userPerformances,
      auth,
    },
    {
      key: managerKey,
      Performance: managerPerformances,
      auth,
    },
    {
      key: ProductKey,
      Performance: ProductPerformance,
      auth,
    },
  ]);

  const {
    getFetcher,
    getUserInfoUrl,
    setUserInfo,
    isAuthenticatedUser,
  } = initial.auth;

  const { data } = useSWR(
    getUserInfoUrl(isAuthenticatedUser),
    getFetcher(isAuthenticatedUser),
    {
      refreshInterval: 8000,
      suspense: false,
      revalidateOnFocus: true,
    }
  );

  React.useEffect(() => {
    setUserInfo(data, auth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // const { results: posts, count } = data;

  return (
    <MainContext.Provider displayName="wooback" value={{ ...initial }}>
      {props.children}
    </MainContext.Provider>
  );
};

export default HomeProvider;
