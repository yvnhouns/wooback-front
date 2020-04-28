import React from "react";
import slugify from "slugify";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// import { useTheme } from "@material-ui/core/styles";
// import useMediaQuery from "@material-ui/core/useMediaQuery";

//const theme = useTheme();
//const mobile = useMediaQuery(theme.breakpoints.down("sm"));

const performContextInitial = (state, dispatch, initial, initArray) => {
  for (let i = 0; i < initArray.length; i++) {
    const { key, Performance, ...resProps } = initArray[i];
    initial = {
      ...initial,
      [key]: MemorizeState({ state, dispatch, key, Performance, ...resProps }),
    };
  }
  return initial;
};

const MemorizeState = ({ state, dispatch, key, Performance, ...resProps }) => {
  const perform = React.useMemo(
    () =>
      resProps.sessionId && resProps.auth
        ? Performance(dispatch, resProps.sessionId, resProps.auth)
        : resProps.auth
        ? Performance(dispatch, resProps.auth)
        : Performance(dispatch),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, resProps.auth && resProps.auth]
  );
  return React.useMemo(() => {
    return {
      ...state[key],
      ...perform,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state[key], resProps.auth && resProps.auth]);
};

const calculPourcentage = (salePrice, price, tva) => {
  const sp = parseInt(salePrice);
  const p = parseInt(price);
  const t = parseInt(tva);

  const pourc = 100 - ((sp - t) * 100) / (p - t);
  return Math.round(pourc);
};

export const sluger = (value) => {
  return slugify(value, {
    lower: true,
    remove: /[*^#{°=}+|`_+~.()'"!:@]/g,
  });
};

const removeArrayFromArray = (rootArray, childArray, fieldId) => {
  let mu = [...rootArray];
  for (let i = 0; i < childArray.length; i++) {
    const element = childArray[i];

    if (fieldId) {
      mu = mu.filter((item) => item[`${fieldId}`] !== element[`${fieldId}`]);
    }
    if (!fieldId) {
      mu = mu.filter((item) => item.id !== childArray[i]);
    }
  }

  return mu;
};

const arrayFromObject = (object) => {
  return Object.entries(object).map(([key, item]) => item);
};

const removeUndefined = (object) => {
  return JSON.parse(JSON.stringify(object));
};

const objectFromArray = async (array, key) => {
  let val = {};

  for (let i = 0; i < array.length; i++) {
    const elem = array[i];
    const id = key ? elem[key] : i;
    val = { ...val, [`${id}`]: elem };
  }
  return val;
};

const dateToText = (date = "2020-04-18T18:07:09.753Z") => {
  const madate = new Date("2020-04-18T18:07:09.753Z");
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    second: "numeric",
    minute: "numeric",
  };

  return madate.toLocaleDateString(undefined, options);
};
export {
  performContextInitial,
  objectFromArray,
  arrayFromObject,
  MemorizeState,
  calculPourcentage,
  sleep,
  removeArrayFromArray,
  removeUndefined,
  dateToText,
};
