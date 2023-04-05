import { CreateAxiosDefaults } from 'axios';

const HALF_MINUTES = 1000 * 30;

const axios: CreateAxiosDefaults = {
  timeout: HALF_MINUTES,
  headers: { 'content-type': 'application/json' },
  // withCredentials: true,
};

export default axios;
