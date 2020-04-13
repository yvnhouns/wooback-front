// import { API } from "../../../config";

export const FETCH_COMMENT_REQUESTING = "FETCH_COMMENT_REQUESTING";
export const FETCH_COMMENT_SUCCESS = "FETCH_COMMENT_SUCCESS";
export const FETCH_COMMENT_FAILED = "FETCH_COMMENT_FAILED";
export const SET_SIZE_MEASURES = "SET_SIZE_MEASURES";
export const SET_WEIGHT_MEASURES = "SET_WEIGHT_MEASURES";

export const columnsBeEncoded = [
  "price_html",
  "description",
  "short_description",
];
export const columnsMustNumber = ["price", "regular_price", "sale_price"];
