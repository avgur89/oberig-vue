import axios from '../plugins/axios';
import { setupWebp } from '../modules/_helpers';

/**
 * Get items for '/collection/...' or '/catalog' pages
 *
 * @async
 * @param {String} url
 * @param {Boolean} webp
 * @return {Promise.<Array>}
 */
export async function getProducts(url, webp) {
  const [path, query] = url.split('?');
  let productItemsPath = query
    ? `${path}/filter?${query}`
    : `${path}/filter`;

  // set up webp headers
  productItemsPath = setupWebp(productItemsPath, webp);

  try {
    const { data } = await axios.get(...productItemsPath);
    return data;
  } catch (e) {
    console.log(e.message);
    return [];
  }
}

/**
 * Get items for '/collection/...' or '/catalog' pages
 *
 * @async
 * @param {String|Boolean} lang
 * @param {Array} productAliases
 * @param {Boolean} webp
 * @return {Promise.<Array>}
 */
export async function getRelatedProducts(productAliases, lang, webp) {
  let url = 'formalization/get-products?';

  // add language to search query
  if (lang) {
    url = `${lang}/${url}`;
  }

  // generate aliasesd query
  productAliases.forEach((alias) => {
    url += `aliases[]=${alias}&`;
  });

  // set up webp headers
  url = setupWebp(url, webp);

  try {
    const { data: { relatedProducts } } = await axios.get(...url);
    return relatedProducts;
  } catch (e) {
    console.log(e.message);
    return [];
  }
}
