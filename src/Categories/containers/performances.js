import actions from "./actions";
import { createCategoryApi } from "./api";
import { fetcherWithToken } from "../../utils/fecthers";
import { API } from "../../config";

const performances = (dispatch, auth) => {
  const createCategory = (category, next) => {
    const { user, token } = auth;
    createCategoryApi(user._id, token, category).then((data) => {
      next(data);
      // dispatch(actions.createCategoryAction(data));
    });
  };

  const getFecther = () => {
    const { token } = auth;
    const fetcher = (link) => fetcherWithToken(link, token);
    return fetcher;
  };

  const getProductsCategoriesUrl = (searchData) => {
    const { user } = auth;
    return `${API}/categories/${user._id}`;
  };

  return {
    createCategory,
    getFecther,
    getProductsCategoriesUrl,
  };
};

export default performances;
