import axios from '../plugins/axios';
import { setupWebp } from '../modules/_helpers';

/**
 * @async
 * @param {Object} route
 * @param {Boolean} webp
 * @return {Promise.<Object>}
 */
export async function getGlobalData({ route: { fullPath }, webp }) {
  let url = setupWebp(fullPath, webp);

  const { data } = await axios.get(...url);

  if (!data || data.error) throw new Error(`Request failed with error ${data.error}`);

  return data;
}
