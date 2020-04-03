import * as type from "./constants";

const actions = {
  setSizeMeasuresActions: payload => ({
    type: type.SET_SIZE_MEASURES,
    payload
  }),
  setWeightMeasuresAction: payload => ({
    type: type.SET_WEIGHT_MEASURES,
    payload
  })
};

export default actions;
