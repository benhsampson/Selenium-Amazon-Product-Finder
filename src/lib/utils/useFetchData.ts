import type {AxiosRequestConfig} from 'axios';

import {useState, useEffect, useCallback} from 'react';
import axios from 'axios';

interface UseFetchDataParams {
  url: string;
  payload: object;
  config?: AxiosRequestConfig;
  immediate?: boolean;
}

const useFetchData = ({
  url,
  payload,
  config,
  immediate = false,
}: UseFetchDataParams) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState((null as unknown) as any);
  const [error, setError] = useState((null as unknown) as Error);

  const execute = useCallback(() => {
    setIsLoading(true);

    return axios
      .post(url, payload, config)
      .then(res => setData(res.data))
      .catch(err => setError(err))
      .finally(() => setIsLoading(false));
  }, [url, payload]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate]);

  return {execute, isLoading, data, error};
};

export default useFetchData;
