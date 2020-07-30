import type {Request, Response} from 'express';

import passport from 'passport';
import cookieSession from 'cookie-session';
import {Strategy as LocalStrategy} from 'passport-local';

import User from '../models/user';

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

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({username});
      if (!user || !user._id) {
        return done(null, false);
      } else if (!user.comparePassword(password)) {
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      throw err;
    }
  })
);

export default (fn: Function) => (req: Request, res: Response) => {
  if (!res.redirect) {
    console.log('res.redirect is undefined - passport.js needs res.redirect');
  }

  cookieSession({
    name: 'passportSession',
    signed: false,
    domain: 'localhost',
    maxAge: 24 * 60 * 60 * 1000,
  })(
    req,
    res,
    /* next */ () =>
      passport.initialize()(
        req,
        res,
        /* next */ () =>
          passport.session()(req, res, /* next */ () => fn(req, res))
      )
  );
};
