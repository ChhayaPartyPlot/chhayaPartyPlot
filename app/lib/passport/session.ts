import session from 'express-session';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextApiHandler } from 'next';
import passport from './passport';

export const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET !,
  resave: false,
  saveUninitialized: false,
});

export function withSession(handler: NextApiHandler) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    // @ts-ignore
    sessionMiddleware(req, res, () => {
      // @ts-ignore
      passport.initialize()(req, res, () => {
        // @ts-ignore
        passport.session()(req, res, () => handler(req, res));
      });
    });
  };
}
