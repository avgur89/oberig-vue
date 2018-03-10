/* eslint-disable no-alert */

import axios from '../plugins/axios';
import { generateUrl } from '../modules/_helpers';

const showError = message =>
  window.alert(`Order request error occurred: ${message}`);

/**
 * @async
 * @param {Object} data
 * @param {Object} $router - vue $router instance
 * @param {Function} [callback]
 * @return {Promise}
 */
export async function sendForm(data, $router, callback) {
  try {
    const { data: response } = await axios.post('/order-request', data);

    if (response.error) return showError(response.error);

    const thanksPageUrl = generateUrl($router.currentRoute.params.lang, 'thanks');
    $router.push(thanksPageUrl);

    if (callback && typeof callback === 'function') callback();
  } catch (e) {
    showError(e.message);
  }
}
