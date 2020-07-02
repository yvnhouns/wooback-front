import {
  WOOCOMMERCE_URL,
  WOOCOMMERCE_KEY,
  WOOCOMMERCE_SECRET,
} from "../config.js";
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

export default (
  url = WOOCOMMERCE_URL,
  consumerKey = WOOCOMMERCE_KEY,
  consumerSecret = WOOCOMMERCE_SECRET
) =>
  new WooCommerceRestApi({
    url,
    consumerKey,
    consumerSecret,
    version: "wc/v3",
    queryStringAuth: true,
  });
