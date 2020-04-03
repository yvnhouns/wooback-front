import * as type from "./constants";

const key = "product";
const init = {
  comments: [],
  sizeMeasures: [],
  weightMeasures: [],
  products: []
};

const reducer = (state = { init }, action) => {
  switch (action.type) {
    case type.FETCH_COMMENT_SUCCESS:
      return {
        ...state,
        comments: action.payload
      };
    case type.SET_WEIGHT_MEASURES:
      return {
        ...state,
        weightMeasures: action.payload
      };
    case type.SET_SIZE_MEASURES:
      return {
        ...state,
        sizeMeasures: action.payload
      };
    default:
      return state;
  }
};

export { key, init };
export default reducer;
