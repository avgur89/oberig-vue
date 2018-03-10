import axios from '../plugins/axios';
import { setupWebp } from '../modules/_helpers';

/**
 * Get symbols for 'symbols' page
 *
 * @async
 * @param {String} lang
 * @param {String} category
 * @param {String|Number|Boolean} [offset]
 * @param {Boolean} webp
 * @return {Promise.<Object>}
 */
export async function getSymbols(lang, category, offset, webp) {
  let consolidatedUrl = `symbol/category?alias=${category}`;

  // set up language
  if (lang) {
    consolidatedUrl = `${lang}/${consolidatedUrl}`;
  }

  // setup items offset
  if (offset) {
    consolidatedUrl += `&offset=${offset}`;
  }

  // webp headers
  consolidatedUrl = setupWebp(consolidatedUrl, webp);

  try {
    const { data: { empty, models } } = await axios.get(...consolidatedUrl);
    return { isEmpty: empty, data: models };
  } catch (e) {
    console.log(e.message);
    return {};
  }
}
