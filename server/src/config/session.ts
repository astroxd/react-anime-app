import { Router } from 'express';
import session, { SessionOptions } from 'express-session';
import getStoreSession from 'src/middlewares/sessionStore.middleware';

const router = Router();

router.use(
  session({
    store: getStoreSession(session), //?Switch to redis store
    key: process.env.SESSION_KEY,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 24 * 1000 * 10,
      secure: process.env.NODE_ENV === 'PRODUCTION',
    },
  } as SessionOptions)
);

export default router;
