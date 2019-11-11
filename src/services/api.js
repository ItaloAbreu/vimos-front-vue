import axios from 'axios';

export const baseURL = process.env.VUE_APP_API;

const api = axios.create({
  baseURL,
});

export default api;