// import actions from "./actions";

import {
  createPostApi,
  importPostsApi,
  wooUpdateProductApi,
  updatePostApi,
  wooUpdateManyProductsApi,
} from "./api";
import { synchroneApi } from "../../Importer/container/api";

import { API } from "../../config";
import queryString from "query-string";
import { fetcherWithToken } from "../../utils/fecthers";
import { encodeProductsFields, convertNumberFieds } from "./utils";

const performances = (dispatch, auth) => {
  const createProduct = (formData, next, isAuth) => {
    const { user, token } = isAuth ? isAuth : auth;
    createPostApi(user._id, token, formData).then((data) => {
      checkErrorData(data, next, async () => {
        next({ success: true, data: data.post });
      });
    });
  };

  const updateProduct = async (post, next) => {
    const { user, token } = auth;
    let content = (await encodeProductsFields([{ ...post.content }], true))[0];

    updatePostApi(user._id, token, { ...post, content }).then((data) => {
      checkErrorData(data, next, async () => {
        next({ success: true, data: data.post });
      });
    });
  };

  const wooUpdateProduct = async (_id, body, next) => {
    const { id } = body;
    delete body.id;

    await wooUpdateProductApi({ body, id })
      .then(async (response) => {
        if (response !== undefined) {
          console.log({ response });
          await updateProduct({ _id, content: response.data }, ({ error }) => {
            error && console.log({ "vvvvv": { _id, error } });
          });
          next({ success: true, data: response.data });
        }
      })
      .catch((err) => {
        let error = err.response ? err.response.data.message : "failed";
        !error.response && console.log({ error: error.response });
        next({ error });
        console.log({ "mmmmmm": { _id, err, auth } });
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
    // const { search, order, sortBy, limit, searchInFields } = searchData;
    const query = queryString.stringify({ ...searchData });
    return `${API}/posts/partial-search?${query}`;
  };

  const getProductsCategoriesUrl = (searchData) => {
    const { user } = auth;
    return `${API}/categories/${user._id}`;
  };

  const getFecther = () => {
    const { token } = auth;
    const fetcher = (link) => fetcherWithToken(link, token);
    return fetcher;
  };

  const wooUpdateManyProducts = async (data, next) => {
    await wooUpdateManyProductsApi(data)
      .then(async (response) => {
        if (response !== undefined) {
          const products = response.data;
          await synchroneProducts(products, ({ error }) => {
            error && console.log({ "vvvvv": { error } });
          });
          next({ success: true, data: products });
        }
      })
      .catch((err) => {
        let error = err.response ? err.response.data.message : "failed";
        !error.response && console.log({ error: error.response });
        next({ error });
        console.log({ "mmmmmm": { err } });
      });
  };

  const synchroneProducts = async (products, next) => {
    const { user, token } = auth;
    const values = await encodeProductsFields(products, true);
    synchroneApi(user._id, token, values).then((data) => {
      checkErrorData(data, next, async () => {
        next({ success: true, data: [] });
      });
    });
  };

  return {
    createProduct,
    updateProduct,
    getProductsListSearchFilterUrl,
    getProductsListPartialSearchFilterUrl,
    getFecther,
    importLists,
    wooUpdateProduct,
    getProductsCategoriesUrl,
    wooUpdateManyProducts,
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
