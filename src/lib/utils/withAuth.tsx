import React, {useState, useEffect} from 'react';
import AuthService from './AuthService';

export default function withAuth(
  AuthComponent: React.ComponentClass<{auth: any}>
) {
  const Auth = new AuthService('http://localhost:3000');
  return function authenticated() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      if (!Auth.isLoggedIn()) {
        console.log('Not logged in');
      }
      setIsLoading(false);
    }, [isLoading]);

    return !isLoading ? <AuthComponent auth={Auth} /> : <p>Loading</p>;
  };
}
