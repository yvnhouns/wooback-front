import * as type from "./constants";

const actions = {
  submitSettingAction: payload => ({
    type: type.SUBMIT_ACTION,
    payload
  }),
  setQueryAction: payload => ({
    type: type.SET_QUERIES,
    payload
  }),
  initSettingAction: payload => ({
    type: type.INIT_SETTING,
    payload
  })
};

export default actions;
