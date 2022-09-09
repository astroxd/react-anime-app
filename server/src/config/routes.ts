import { Router } from 'express';

//* Routes

//* Auth
import register from '../routes/auth/register';
import login from '../routes/auth/login';
import logout from '../routes/auth/logout';
import sessionRoute from '../routes/auth/session';

//* List
import lists from '../routes/lists/list';

//* List Entrie
import listEntrie from '../routes/listEntrie/listEntrie';

//* Favorites
import favorites from '../routes/favorites';

const router = Router();

//* Auth
router.use('/api/register', register);
router.use('/api/login', login);
router.use('/api/logout', logout);
router.use('/api/session', sessionRoute);

//* List
router.use('/api/lists', lists);

//* List Entrie
router.use('/api/listEntrie', listEntrie);

//* Favorites
router.use('/api/favorites', favorites);

export default router;
