import {useState, useCallback} from 'react';
import axios from 'axios';

interface UseFetchDataParams {
  url: string;
  payload: object;
}

const useFetchData = ({url, payload}: UseFetchDataParams) => {
  const [res, setRes] = useState({data: null, error: null, isLoading: false});

  const callApi = useCallback(() => {
    setRes(prevState => ({...prevState, isLoading: true}));
    return axios
      .post(url, payload)
      .then(res => {
        console.log('succeeded');
        setRes({data: res.data, isLoading: false, error: null});
      })
      .catch(error => {
        console.error('failed', error);
        setRes({data: null, isLoading: false, error});
        throw error;
      });
  }, [url, payload]);

  return {res, callApi};
};

export default useFetchData;
