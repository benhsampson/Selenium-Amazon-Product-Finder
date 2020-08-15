import React, {useContext} from 'react';
// import Axios from 'axios';
import NextApp, {AppContext} from 'next/app';
import {getTokenLocalStorage} from './authLocalStorage';
import {AppInitialProps} from 'next/app';

type AuthProviderProps = Readonly<AppInitialProps> & {
  token: TokenObj;
};

export interface TokenObj {
  token: string;
  expiresAt: string | null;
}

const AuthContext = React.createContext<TokenObj>(
  (null as unknown) as TokenObj
);

const withAuth = (App: NextApp | any) => {
  return class AuthProvider extends React.Component<AuthProviderProps> {
    static displayName = `AuthProviderProps(MyApp)`;

    constructor(props: AuthProviderProps) {
      super(props);
      this.state = {window: null};
    }

    componentDidMount() {
      this.setState({window});
    }

    static async getInitialProps(ctx: AppContext): Promise<AuthProviderProps> {
      console.log('0');

      let appProps: AppInitialProps;
      appProps = await NextApp.getInitialProps(ctx);

      const {token, expiresAt} = getTokenLocalStorage(window);

      console.log(token, expiresAt);

      if (!token) {
        ctx.ctx.res?.writeHead(303, {Location: '/register'});
        ctx.ctx.res?.end();
        return Promise.resolve({
          pageProps: null,
          token: (null as unknown) as TokenObj,
        });
      }

      const headers: any = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

      headers['Authorization'] = token;

      return {
        ...appProps,
        token: {
          token,
          expiresAt,
        },
      };
    }

    render() {
      const {token, ...appProps} = this.props;
      return (
        <AuthContext.Provider value={token}>
          {JSON.stringify(token)}
          <App {...appProps} />
        </AuthContext.Provider>
      );
    }
  };
};

// function useProvideAuth() {
//   const [userIsLoading, setUserIsLoading] = useState(false);
//   const [user, setUser] = useState((null as unknown) as any);
//   const [userError, setUserError] = useState((null as unknown) as Error);

//   const setToken = (tokenObj: {token: string; expiresIn: string}) =>
//     setTokenLocalStorage(tokenObj, window);

//   const getToken = () => getTokenLocalStorage(window);

//   const isLoggedIn = () => {
//     return !!getToken();
//   };

//   const login = () => {
//     setUserIsLoading(true);
//     return Axios.post('http://localhost:3000/api/login', {
//       email: 'test03@test.com',
//       password: 'test',
//     })
//       .then(res => {
//         setToken(res.data);
//         return fetch('http://localhost:3000/api/user')
//           .then(res => {
//             setUser(res.data);
//           })
//           .catch(err => setUserError(err));
//       })
//       .catch(err => setUserError(err))
//       .finally(() => setUserIsLoading(false));
//   };

//   const fetch = (url: string) => {
//     const headers: any = {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     };

//     if (isLoggedIn()) {
//       headers['Authorization'] = getToken();
//     }

//     return Axios.get(url, {headers})
//       .then(res => {
//         return res;
//       })
//       .catch(err => {
//         throw err;
//       });
//   };

//   return {
//     userIsLoading,
//     user,
//     userError,
//     isLoggedIn,
//     login,
//     fetch,
//   };
// }

// export function ProvideAuth({children}: {children: React.ReactNode}) {
//   const auth = useProvideAuth();
//   return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
// }

export const useAuth = () => useContext(AuthContext);

export default withAuth;
