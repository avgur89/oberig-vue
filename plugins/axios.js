import axios from 'axios';
import { baseUrl as baseURL } from '../modules/_helpers';

export default axios.create({
  baseURL,
  timeout: 10000,
  headers: { 'X-VUE': true }
});
