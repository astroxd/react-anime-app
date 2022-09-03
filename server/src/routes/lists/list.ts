import { Router } from 'express';
import prisma from 'src/client';

const router = Router();

router.get('/', async (req, res) => {
  const { userId } = req.body;

  const lists = await prisma.list.findMany({ where: { userId }, select: { listId: true, code: true, name: true } });

  res.send({ data: lists });
});

export default router;
