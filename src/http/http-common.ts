import axios from 'axios';
import type {AxiosRequestConfig} from 'axios';
import {BASE_URL} from '../../env';
import {setupCache} from 'axios-cache-interceptor';

// Create an instance
const axiosInstance = axios.create({
  baseURL: BASE_URL + '/api',
  timeout: 6000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const instance = setupCache(axiosInstance);

// Logging the API
const log_api = (method: string, path: string) => {
  console.log(`${method} - ${path}`);
};

// Create httpCommon function
export default function httpCommon() {
  return {
    async get(url: string, config?: AxiosRequestConfig) {
      log_api('GET', url);
      return await instance.get(url, config);
    },
  };
}
