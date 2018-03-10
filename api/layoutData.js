import axios from '../plugins/axios';
import { baseUrl } from '../modules/_helpers';

/**
 * @async
 * @param {String} lang
 * @return {Promise.<Object>}
 */
export async function getLayoutData(lang) {
  const layoutUrl = `${baseUrl}${lang ? `/${lang}` : ''}/layout-data`;
  const { data } = await axios.get(layoutUrl);
  return data;
}
