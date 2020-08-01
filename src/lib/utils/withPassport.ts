import type {Request, Response} from 'express';

import passport from 'passport';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
// import {Strategy as LocalStrategy} from 'passport-local';
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';

export {default as passport} from 'passport';

import User, {UserDocument} from '../models/user';

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // TODO
      secretOrKey: 'secret',
      // usernameField: 'email',
    },
    (jwtPayload, done) => {
      // TODO: store user's public info in JWT
      return User.findOne(
        {_id: jwtPayload.sub},
        async (err: Error, user: UserDocument) => {
          // if (err) {
          //   return done(err);
          // } else if (!user || !user._id) {
          //   return done({message: 'Incorrect email.'});
          // } else if (!(await user.comparePassword(password))) {
          //   return done({message: 'Incorrect password.'});
          // }
          // const {token, expiresIn} = user.issueJwt();
          // return done(null, {token, expiresIn});
          if (err) return done(err);
          if (!user) return done(null, false);
          return done(user);
        }
      );
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, typeof user === 'string' ? user : JSON.stringify(user));
});

passport.deserializeUser((serializedUser: string, done) => {
  let user;

  try {
    user = JSON.parse(serializedUser);
  } catch (err) {
    throw err;
  }

  if (user && user._id) {
    done(null, user);
  }
});

export default (fn: Function) => (req: Request, res: Response) => {
  if (!res.redirect) {
    console.error('res.redirect is undefined - passport.js needs res.redirect');
  }

  return cookieParser()(req, res, () =>
    cookieSession({
      // TODO: dynamic domain
      domain: 'localhost',
      maxAge: 24 * 60 * 60 * 1000,
      signed: false,
    })(req, res, () =>
      passport.initialize()(req, res, () =>
        passport.session()(req, res, () => {
          console.log('passport initialized');
          fn(req, res);
        })
      )
    )
  );
};
