// import actions from "./actions";

import {
  createPostApi,
  importPostsApi,
  wooUpdateProductApi,
  updatePostApi,
} from "./api";
import { API } from "../../config";
import queryString from "query-string";
import { fetcherWithToken } from "../../utils/fecthers";

const performances = (dispatch, auth) => {
  const createProduct = (formData, next, isAuth) => {
    const { user, token } = isAuth ? isAuth : auth;
    createPostApi(user._id, token, formData).then((data) => {
      checkErrorData(data, next, async () => {
        next({ success: true, data: data.post });
      });
    });
  };

  const updateProduct = (formData, next) => {
    const { user, token } = auth;
    updatePostApi(user._id, token, formData).then((data) => {
      checkErrorData(data, next, async () => {
        next({ success: true, data: data.post });
      });
    });
  };

  const wooUpdateProduct = async (_id, body, next) => {
    const { id } = body;
    delete body.id;

    await wooUpdateProductApi({ body, id })
      .then((response) => {
        if (response !== undefined) {
          updateProduct({ _id, content: response.data }, ({ error }) => {
            error && console.log({ "vvvvv": error });
          });
          next({ success: true, data: response.data });
        }
      })
      .catch((err) => {
        let error = err.response ? err.response.data.message : "failed";
        !error.response && console.log({ error: error.response });
        next({ error });
        console.log({ "lllll": err });
      });
  };

  const importLists = (posts, next) => {
    const { user, token } = auth;
    importPostsApi(user._id, token, posts).then((data) => {
      checkErrorData(data, next, async () => {
        const { duplicatedIds, duplicatedNames, posts } = data;
        next({ success: true, duplicatedIds, duplicatedNames, data: posts });
      });
    });
  };

  const getProductsListSearchFilterUrl = (searchData) => {
    const { search, order, sortBy, limit } = searchData;
    const query = queryString.stringify({ search, order, sortBy, limit });
    return `${API}/posts/search?${query}`;
  };

  const getProductsListPartialSearchFilterUrl = (searchData) => {
    const { search, order, sortBy, limit, searchInFields } = searchData;
    const query = queryString.stringify({
      search,
      order,
      sortBy,
      limit,
      searchInFields,
    });
    return `${API}/posts/partial-search?${query}`;
  };

  const getFecther = () => {
    const { token } = auth;
    const fecther = (link) => fetcherWithToken(link, token);
    return fecther;
  };

  return {
    createProduct,
    updateProduct,
    getProductsListSearchFilterUrl,
    getProductsListPartialSearchFilterUrl,
    getFecther,
    importLists,
    wooUpdateProduct,
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
