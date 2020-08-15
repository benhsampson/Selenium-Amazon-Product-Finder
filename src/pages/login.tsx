import React, {useState} from 'react';
import axios from 'axios';

// import useFetchData from '../lib/utils/useFetchData';
import {setTokenLocalStorage} from '../lib/utils/authLocalStorage';

const Login = () => {
  // const {execute, data, isLoading, error} = useFetchData({
  //   url: 'http://localhost:3000/api/login',
  //   payload: {
  //     email: 'test03@test.com',
  //     password: 'test',
  //   },
  //   config: {
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //   },
  // });
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState((null as unknown) as TokenObj);
  const [error, setError] = useState((null as unknown) as Error);

  const login = () => {
    setIsLoading(true);

    let headers: any = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    return axios
      .post(
        'http://localhost:3000/api/login',
        {
          email: 'test03@test.com',
          password: 'test',
        },
        {
          headers,
        }
      )
      .then(res => {
        setTokenLocalStorage(res.data);
        console.log(res);
        return setData(res.data);
      })
      .catch(err => setError(err))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {isLoading && <p>{JSON.stringify(isLoading)}</p>}
      {error && <p>{JSON.stringify(error)}</p>}
      {data && <p>{JSON.stringify(data)}</p>}
      <button onClick={login} type="button">
        Login
      </button>
    </>
  );
};

export default Login;
