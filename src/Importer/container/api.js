//import { API } from "../../../config";
import {
  API,
  WOOCOMMERCE_URL,
  WOOCOMMERCE_KEY,
  WOOCOMMERCE_SECRET,
} from "../../config";

const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

/**
 *
 * @param {String} userId
 * @param {String} token
 * @param {Object} post {id:[string], content:Oobject}
 */
export const createPostApi = async (userId, token, post) => {
  try {
    const response = await fetch(`${API}/post/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

/**
 *
 * @param {String} userId
 * @param {String} token
 * @param {Array} posts Array of products
 */
export const importPostsApi = async (userId, token, posts) => {
  try {
    const response = await fetch(`${API}/posts/import/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ posts }),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const synchroneApi = async (
  userId,
  token,
  posts,
  endpoints = "products/"
) => {
  let str = endpoints.split("/");
  const name = str[str.length - 2];
  try {
    const response = await fetch(`${API}/${endpoints}sync/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ [`${name}`]: posts }),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

/**
 *
 * @param {String} userId
 * @param {String} token
 * @param {Object} post {_id:[string], id:[string], content:Oobject}
 */
export const updatePostApi = async (userId, token, post) => {
  try {
    const response = await fetch(`${API}/post/${post._id}/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

/**
 *
 * @param {String} userId
 * @param {String} token
 * @param {Object} selections {posts:[string],  content:Oobject}
 */
export const updatePostsApi = async (userId, token, selections) => {
  try {
    const response = await fetch(`${API}/posts/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(selections),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const wooUpdateProductApi = async ({ body, id }) => {
  try {
    const response = await wooApi.put("products/" + id, { ...body });
    return response;
  } catch (err) {
    
    console.log(err);
  }
};

export const wooFecth = (endpoints, params) => {
  try {
    const response = wooApi.get(endpoints, params);
    return { response };
  } catch (err) {
    console.log({ error: err });
    return { error: "can not fetch" };
  }
};

const wooApi = new WooCommerceRestApi({
  url: WOOCOMMERCE_URL,
  consumerKey: WOOCOMMERCE_KEY,
  consumerSecret: WOOCOMMERCE_SECRET,
  version: "wc/v3",
  queryStringAuth: true,
});

export const wooApiEndpoints = {
  "produits": "products/",
  "catégories": "products/categories/",
};
