import * as type from "./constants";

const key = "category";
const init = { categories: [] };

const reducer = (state = { init }, action) => {

  switch (action.type) {
    case type.GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload.categories
      };
    default:
      return state;
  }
};

export { key, init };
export default reducer;
