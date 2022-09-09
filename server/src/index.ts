import express from 'express';

import dotenv from 'dotenv';

import common from './config/common';
import session from './config/session';
import staticFiles from './config/staticFiles';
import routes from './config/routes';

const app = express();

dotenv.config();

app.use(common);
app.use(session);
app.use(staticFiles);
app.use(routes);

app.get('/', (req, res) => {
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
export default app;
