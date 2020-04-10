import React from "react";
import { useReducer } from "reinspect";
import combineReducer from "../utils/combineReducer";
import MainContext from "./AdminContext";
import { performContextInitial } from "../utils";

// Auth reducers
import AuthReducer, {
  key as AuthKey,
  init as AuthInit,
} from "../auth/containers/reducer.js";
import AuthPerformances from "../auth/containers/performances";

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

import ProductReducer, {
  key as ProductKey,
  init as ProductInit,
} from "../Product/container/reducer";
import ProductPerformance from "../Product/container/performances";

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
  };

  // root reducer
  const rootReducer = combineReducer({
    [AuthKey]: AuthReducer,
    [ProductKey]: ProductReducer,
    [LayoutKey]: LayoutReducer,
    [alertKey]: alertReducer,
    [importerKey]: importerReducer,
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

  initial = performContextInitial(state, dispatch, initial, [
    { key: AuthKey, Performance: AuthPerformances },
    { key: LayoutKey, Performance: LayoutPerformance },
    { key: alertKey, Performance: alertPerformances },
    {
      key: importerKey,
      Performance: importerPerformances,
      auth: state[AuthKey].isAuthenticatedUser,
    },
    {
      key: ProductKey,
      Performance: ProductPerformance,
      auth: state[AuthKey].isAuthenticatedUser,
    },
  ]);

  return (
    <MainContext.Provider displayName="wooback" value={{ ...initial }}>
      {props.children}
    </MainContext.Provider>
  );
};

export default HomeProvider;
