import prisma from 'src/client';
import Router from 'express';
import User from 'src/models/user';

const router = Router();

router.get('/', async (req, res) => {
  console.log('get session');
  if (req.session?.user) {
    const savedUser = await prisma.user.findUnique({ where: { userId: req.session.user } });
    if (!savedUser) return res.send({});

    const user = new User(savedUser);
    res.send({ user });
  } else {
    res.send({});
  }
});

export default router;
