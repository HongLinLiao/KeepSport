import { RequestWrapper } from '@/requests/request';
import { useMemo } from 'react';
import useAxios from './useAxios';

const useRequest = () => {
  const { axios } = useAxios();

  const fetch = useMemo(
    () =>
      <T>(requestWrapper: RequestWrapper<T>) => {
        return requestWrapper.executor(axios).then((res) => res.data);
      },
    [axios]
  );

  return { fetch };
};

export default useRequest;
