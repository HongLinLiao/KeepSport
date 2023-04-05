import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

type HttpMethod = 'GET' | 'POST';

export interface RequestWrapper<T> {
  executor: (axiosInstance: AxiosInstance) => Promise<AxiosResponse<T>>;
  url: string;
  method: string;
}

export const requestWrapper = <T>(
  config: AxiosRequestConfig & { url: string; method: HttpMethod }
): RequestWrapper<T> => {
  return {
    executor: (axiosInstance: AxiosInstance) => {
      return axiosInstance.request(config);
    },
    url: config.url,
    method: config.method,
  };
};
