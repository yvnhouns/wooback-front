// import actions from "./actions";
import { updateStatusApi, updateWooStatusApi, updateApi } from "./api";
import { fetcherWithToken } from "../../utils/fecthers";
import { API } from "../../config";
import queryString from "query-string";

const performances = (dispatch, auth) => {
  const update = async (_id, data, next) => {
    const { user, token } = auth;
    updateApi(user._id, token, _id, data).then((data) => {
      next && next(data);
    });
  };

  const updateStatus = (id, status, next) => {
    const { user, token } = auth;
    updateStatusApi(user._id, token, id, status).then((data) => {
      next && next(data);
    });
  };

  const updateWooStatus = (ids, status, next) => {
    const { id, _id } = ids;
    updateWooStatusApi(id, status)
      .then(async (response) => {
        if (response !== undefined) {
          const { data } = response;
          data && (await update(_id, data));
          next && next(data);
        } else console.log("contenu vide");
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const getFetcher = () => {
    const { token } = auth;
    const fetcher = (link) => fetcherWithToken(link, token);
    return fetcher;
  };

  const getPartialSearch = (searchData) => {
    const { user } = auth;
    // const { search, limit, offset } = searchData;
    const query = queryString.stringify({ ...searchData });
    return `${API}/orders/partial-search/${user._id}?${query}`;
  };

  const getReadUrl = (id) => {
    const { user } = auth;
    return `${API}/order/${id}/${user._id}`;
  };

  const getOrderStatus = () => {
    const { user } = auth;
    return `${API}/orders/local-status/${user._id}`;
  };

  const getWooOrderStatus = () => {
    const { user } = auth;
    return `${API}/orders/status/${user._id}`;
  };

  const checkPermission = (access) => {
    const { user } = auth;

    let allow = false;
    if (user) {
      if (user.supUser) return true;

      const { accesses } = user;
      allow = access ? (accesses ? accesses[`${access}`] : undefined) : false;
    }
    return allow;
  };

  return {
    getFetcher,
    getReadUrl,
    getOrderStatus,
    getWooOrderStatus,
    getPartialSearch,
    updateStatus,
    updateWooStatus,
    checkPermission,
  };
};

export default performances;
