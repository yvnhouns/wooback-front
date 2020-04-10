import actions from "./actions";

import { synchroneApi, wooFecth } from "./api";
import { wooApiEndpoints } from "./constants";
import { API } from "../../config";
import queryString from "query-string";

const performances = (dispatch, auth) => {
  const submitSetting = (setting) => {
    const queries = getQueries(setting);
    dispatch(actions.submitSettingAction({ setting, queries }));
  };
  const setQuery = ({ page, data, ...restProps }) => {
    dispatch(actions.setQueryAction({ page, data, ...restProps }));
  };

  const synchronePost = (page, posts, endpoint) => {
    const { user, token } = auth;
    synchroneApi(user._id, token, posts, endpoint).then((data) => {
      checkErrorData(
        data,
        ({ error }) => {
          setQuery({ page, status: 4, error: error });
        },
        () => {
          setQuery({ page, status: 3 });
        }
      );
    });
  };

  const getQueries = (setting) => {
    let { per_page, order, orderBy, page, page_count, collection } = setting;

    const endpoint = wooApiEndpoints[`${collection}`];
    let queries = [];

    if (endpoint === undefined) return queries;

    for (let i = page; i <= page_count; i++) {
      const query = queryString.stringify({
        page: i,
        per_page,
        order,
        orderBy,
      });
      const { user } = auth;

      const getData = () => {
        const { response, error } = wooFecth(endpoint, {
          per_page,
          page: i,
          orderBy,
          order,
        });

        if (error) {
          setQuery({ page: i, error, status: 4 });
        } else {
          response
            .then((result) => {
              const data = result.data;
              setQuery({ page: i, data, status: 2 });
              synchronePost(i, data, endpoint);
            })
            .catch((error) => console.log({ wooError: error }));
        }
      };
      queries.push({
        page: i,
        status: 0,
        getData: getData,
      });
    }

    return queries;
  };

  const initializeSetting = () => {
    dispatch(actions.initSettingAction({}));
  };

  return {
    submitSetting,
    setQuery,
    initializeSetting,
  };
};

export default performances;

const checkErrorData = (data, sendError, next) => {
  if (data === undefined || (data && data.error)) {
    data && sendError({ error: data.error });
    !data && sendError({ error: "Connexion failed" });
  } else {
    next();
  }
};
