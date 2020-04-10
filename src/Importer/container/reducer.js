import * as type from "./constants";
import { collections } from "../container/constants";

const key = "importer";
const init = {
  setting: {
    per_page: 20,
    page: 1,
    order: "desc",
    orderBy: "id",
    page_count: 10,
    frequence: 2,
    collection: collections[0],
  },
  isCompleted: false,
  isSubmited: false,
  percent: 0,
  queries: [],
  status: [
    "en attente",
    "recuperation...",
    "en cours d'importation...",
    "importée avec succès!",
    "erreur",
  ],
};

const reducer = (state = { init }, action) => {
  switch (action.type) {
    case type.SUBMIT_ACTION:
      return {
        ...state,
        ...setSetting(state, action.payload),
      };

    case type.SET_QUERIES:
      return {
        ...state,
        ...updateQuery(state, action.payload),
      };
    case type.INIT_SETTING:
      return {
        ...init,
        collection: action.payload.collection || init.collection,
      };
    default:
      return state;
  }
};

export { key, init };
export default reducer;

const updateQuery = (state, { page, data, error, status, ...restProps }) => {
  const { queries } = state;
  const i = queries.findIndex((item) => item.page === page);
  if (i !== -1) {
    queries[i] = {
      ...queries[i],
      data: data,
      error,
      status,
    };

    const finished = queries.filter(
      (item) => [3, 4].indexOf(item.status) !== -1
    ).length;
    const count = queries.length;
    const percent = (finished * 100) / count;
    const isCompleted = count === finished;

    if (status === 2) {
      const next = fetchData(queries);
      queries[next] = { ...queries[next], status: 1 };
    }

    const newState = {
      ...state,
      queries,
      isCompleted,
      isSubmited: isCompleted ? false : true,
      percent,
    };
    return newState;
  } else {
    return state;
  }
};

const setSetting = (state, payload) => {
  const { queries, setting } = payload;
  const frequence = setting ? setting.frequence : 1;
  for (let i = 0; i < frequence; i++) {
    const next = fetchData(queries);
    if (queries !== -1) {
      queries[next] = { ...queries[next], status: 1 };
    }
  }

  const newtate = {
    ...state,
    isCompleted: false,
    queries,
    setting: payload.setting,
    isSubmitted: true,
  };

  return newtate;
};

const fetchData = (queries) => {
  const index = queries.findIndex((item) => item.status === 0);
  if (index !== -1) {
    queries[index].getData();
  }
  return index;
};
