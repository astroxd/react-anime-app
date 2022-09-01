import { compareSync } from 'bcrypt';
import { Router } from 'express';
import prisma from 'src/client';
import User from 'src/types/common/user';

const router = Router();

//* Check for bad requests
router.use((req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.send({ error: 'Missing Email or Password' });
  }

  next();
});

router.post('/', async (req, res) => {
  console.log('login');
  const { email, password } = req.body;

  const savedUser = await prisma.user.findUnique({ where: { email } });

  if (!savedUser) return res.send({ error: 'User does not exists' });

  const passwordMatch = compareSync(password, savedUser.password);
  if (!passwordMatch) return res.send({ error: 'Wrong password' });

  const user = new User(savedUser);

  console.log(user);

  //* Update session
  req.session.user = savedUser.userId;
  res.send({ message: 'User login successfully', user });
});

export default router;
