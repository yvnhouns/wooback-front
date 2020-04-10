// import { API } from "../../../config";

export const SUBMIT_ACTION = "SUBMIT_ACTION";
export const SET_QUERIES = "SET_QUERIES";
export const INIT_SETTING = "INIT_SETTING";

export const wooApiEndpoints = {
  "produits": "products/",
  "catégories": "products/categories/",
};

export const collections = Object.entries(wooApiEndpoints).map(
  ([key, item]) => key
);
