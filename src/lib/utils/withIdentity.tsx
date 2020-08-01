import type {AppInitialProps, AppContext} from 'next/app';

import React, {useContext} from 'react';
import NextApp from 'next/app';
import nextCookie from 'next-cookies';

export interface UserIdentity {
  id: string;
  name: string;
  email: string;
}

type IdentityProviderProps = Readonly<AppInitialProps> & {
  session: UserIdentity;
};

const IdentityContext = React.createContext<UserIdentity>(
  (null as unknown) as UserIdentity
);

const withIdentity = (App: NextApp | any) => {
  return class IdentityProvider extends React.Component<IdentityProviderProps> {
    static displayName = `IdentityProviderProps(MyApp)`;
    static async getInitialProps(
      ctx: AppContext
    ): Promise<IdentityProviderProps> {
      console.log('0');

      let appProps: AppInitialProps;
      appProps = await NextApp.getInitialProps(ctx);

      const {passportSession} = nextCookie(ctx.ctx);

      console.log('passport session:', passportSession);

      if (!passportSession) {
        ctx.ctx.res?.writeHead(303, {Location: '/register'});
        ctx.ctx.res?.end();
        return Promise.resolve({
          pageProps: null,
          session: (null as unknown) as UserIdentity,
        });
      }

      const serializedCookie = Buffer.from(
        passportSession,
        'base64'
      ).toString();

      const {
        passport: {user},
      }: {passport: {user: UserIdentity}} = JSON.parse(serializedCookie);

      if (!user) {
        ctx.ctx.res?.writeHead(303, {Location: '/register'});
        ctx.ctx.res?.end();
      }

      const session: UserIdentity = user;

      return {
        ...appProps,
        session,
      };
    }

    render() {
      const {session, ...appProps} = this.props;
      return (
        <IdentityContext.Provider value={session}>
          <App {...appProps} />
        </IdentityContext.Provider>
      );
    }
  };
};

export const useIdentity = (): UserIdentity => useContext(IdentityContext);

export default withIdentity;
