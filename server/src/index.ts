import express, { Request, Response } from 'express';

import fileUpload from 'express-fileupload';

const app = express();

import session, { SessionOptions } from 'express-session';

app.use(express.json());

//TODO check docs
app.use(
  session({
    // store: new pgSession({ pool: pool }),
    key: 'user',
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 24 * 1000 * 10,
      secure: false,
    },
  } as SessionOptions)
);

app.use(fileUpload());
app.use('/api/static', express.static('static'));

//* Routes
// import register from '@src/routes/Auth/register';
import register from './routes/auth/Register';
app.use('/api/register', register);

app.get('/', (req: Request, res: Response) => {
  res.send('root 🚀');
});

app.listen(3001, () => {
  console.log('Running on port 3001');
});
