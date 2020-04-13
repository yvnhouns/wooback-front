import { columnsBeEncoded, columnsMustNumber } from "./constants";
import Encoder from "../../utils/Encoder";

// const { hasEncoded, htmlEncode, htmlDecode } = Encoder;
/**
 *
 * @param {Array} products Array of products to encode
 */
export const encodeProductsFields = async (
  products,
  convertNumberField = false
) => {
  let result = [];
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    for (let y = 0; y < columnsBeEncoded.length; y++) {
      const field = columnsBeEncoded[y];
      if (product[field]) {
        const val = product[field] || "";
        product[field] = !Encoder.hasEncoded(val)
          ? Encoder.htmlEncode(val)
          : val;
      }
    }
  }
  result = [...products];

  if (convertNumberField) {
    result = await convertNumberFieds(result);
  }
  return result;
};

/**
 *
 * @param {Array} products Array of products to decode
 */
export const decodeProductsFields = async (products) => {
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    for (let y = 0; y < columnsBeEncoded.length; y++) {
      const field = columnsBeEncoded[y];
      if (product[field]) {
        product[field] = Encoder.htmlDecode(product[field]);
      }
    }
  }
  return products;
};

/**
 *
 * @param {Array} products Array of products to convert
 */
export const convertNumberFieds = async (products) => {
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    for (let y = 0; y < columnsMustNumber.length; y++) {
      const field = columnsMustNumber[y];
      if (product[field]) {
        const m = product[field];
        product[field] = m === "" ? 0 : parseInt(m);
      }
    }
  }
  return products;
};

export const decodeFields = (product) => {
  for (let y = 0; y < columnsBeEncoded.length; y++) {
    const field = columnsBeEncoded[y];
    if (product[field]) {
      product[field] = Encoder.htmlDecode(product[field]);
    }
  }
  return product;
};
