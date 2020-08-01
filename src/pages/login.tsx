import React from 'react';

import useFetchData from '../lib/utils/useFetchData';

const Login = () => {
  const {res, callApi} = useFetchData({
    url: 'http://localhost:3000/api/login',
    payload: {
      email: 'test03@test.com',
      password: 'test',
    },
  });

  return (
    <>
      {JSON.stringify(res)}
      <button
        onClick={() => {
          return callApi();
        }}
        type="button"
      >
        Login
      </button>
    </>
  );
};

export default Login;
