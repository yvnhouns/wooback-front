import actions from "./actions";
import { signupApi, signinApi, signoutApi } from "./api";
const authPerformances = dispatch => {
  const signin = async (user, next) => {
    signinApi(user).then(async data => {
      checkErrorData(data, next, async () => {
        await dispatch(actions.signinAction(data));
        next({ success: true });
      });
    });
  };

  const signup = (user, next) => {
    signupApi(user).then(async data => {
      checkErrorData(data, next, async () => {
        await dispatch(actions.signUpAction(data));
        !data.error && next();
      });
    });
  };

  const authenticate = async (data, next) => {
    if (typeof window !== undefined) {
      localStorage.setItem("jwt", JSON.stringify(data));

      await dispatch(actions.authenticateAction(...data));
      next();
    }
  };

  const setOpenSigninDialog = open => {
    dispatch(actions.setOpenSigninAction(open));
  };

  const setOpenSignupDialog = open => {
    dispatch(actions.setOpenSignupAction(open));
  };

  const signout = (auth, next) => {
    auth &&
      signoutApi(auth.user._id).then(async data => {
        dispatch(actions.signoutAction(data));
        next();
      });
  };
  const setAdminMode = mode => {
    dispatch(actions.setAdminModeAction(mode));
  };

  const setsetSessionId = session => {
    dispatch(actions.setsetSessionIdAction(session));
  };

  return {
    signin,
    signup,
    authenticate,
    signout,
    setOpenSigninDialog,
    setOpenSignupDialog,
    setAdminMode,
    setsetSessionId
  };
};

const checkErrorData = (data, sendError, next) => {
  if (data === undefined || (data && data.error)) {
    data && sendError({ error: data.error });
    !data && sendError({ error: "Connexion failed" });
  } else {
    next();
  }
};
export default authPerformances;
