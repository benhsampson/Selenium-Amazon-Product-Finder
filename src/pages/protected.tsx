import React from 'react';

import {useAuth} from '../lib/utils/useAuth';

const Protected = () => {
  // const [isLoading, setIsLoading] = useState(false);
  // const [data, setData] = useState((null as unknown) as TokenObj);
  // const [error, setError] = useState((null as unknown) as Error);
  const {token} = useAuth();

  return <p>Authentication status: {JSON.stringify(token)}</p>;
};

export default Protected;
