import actions from "./actions";

const adressPerformances = dispatch => {
  const setError = data => {
    dispatch(actions.setErrorAction(data));
  };

  const setSuccess = data => {
    dispatch(actions.setSucessAction(data));
  };

  const initialize = data => {
    dispatch(actions.initializeAction({}));
  };

  return { setError, setSuccess, initialize };
};

export default adressPerformances;
