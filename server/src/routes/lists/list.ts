import { Router } from 'express';
import prisma from 'src/client';

const router = Router();

router.get('/:user_id', async (req, res) => {
  const { user_id } = req.params;

  const lists = await prisma.list.findMany({
    where: { userId: parseInt(user_id) },
    select: { listId: true, code: true, name: true },
  });

  res.send({ lists });
});

export default router;
