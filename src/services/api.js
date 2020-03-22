import axios from 'axios';

export const baseURL = `${process.env.VUE_APP_URL_BACKEND}/api`;

const api = axios.create({
  baseURL,
});

export default api;