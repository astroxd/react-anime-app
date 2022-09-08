import dotenv from 'dotenv';

dotenv.config();

import express, { Request, Response } from 'express';

import cors from 'cors';

import fileUpload from 'express-fileupload';

const app = express();

import session, { SessionOptions } from 'express-session';
import getStoreSession from './middlewares/sessionStore.middleware';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    credentials: true,
  })
);

app.use(
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

app.use(fileUpload());
app.use('/api/static', express.static('static'));

//* Routes
// import register from '@src/routes/Auth/register';
import register from './routes/auth/Register';
import login from './routes/auth/Login';
import logout from './routes/auth/logout';
import sessionRoute from './routes/auth/session';
app.use('/api/register', register);
app.use('/api/login', login);
app.use('/api/logout', logout);
app.use('/api/session', sessionRoute);

//* List
import lists from './routes/lists/list';
app.use('/api/lists', lists);

//* List Entrie
import listEntrie from './routes/listEntrie/listEntrie';
app.use('/api/listEntrie', listEntrie);

//* Favorites
import favorites from './routes/favorites';
app.use('/api/favorites', favorites);

app.get('/', (req: Request, res: Response) => {
  res.send('root 🚀');
});

app.listen(3001, () => {
  console.log('Running on port 3001');
});

// middleware to test if authenticated
// function isAuthenticated (req, res, next) {
//   if (req.session.user) next()
//   else next('route')
// }
