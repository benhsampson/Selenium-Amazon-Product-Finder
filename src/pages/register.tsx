import React from 'react';

import useFetchData from '../lib/utils/useFetchData';

const Register = () => {
  const {callApi} = useFetchData({
    url: 'http://localhost:3000/api/register',
    payload: {
      name: 'Test03',
      email: 'test03@test.com',
      password: 'test',
      phone: 984128490,
      address_1: 'Test St.',
      postcode: 12345,
      city: 'Melbourne',
      country: 'Australia',
      card_type: 'Visa',
      card_number: 4752477641881133,
      exp_month: 1,
      exp_year: 2022,
      cvc_code: 123,
    },
  });

  return (
    <button
      onClick={() => {
        return (callApi as Function)();
      }}
      type="button"
    >
      Register
    </button>
  );
};

export default Register;
