import { Router } from 'express';
import prisma from 'src/client';

const router = Router();

router.get('/:list_id/:page', async (req, res) => {
  const { list_id, page } = req.params;

  const PER_PAGE = 4;

  const listEntries = await prisma.list.findFirst({
    where: { listId: parseInt(list_id) },
    select: {
      _count: {
        select: { listedAnimes: { where: { listId: parseInt(list_id) } } },
      },
      listedAnimes: {
        where: { listId: parseInt(list_id) },
        orderBy: { updatedAt: 'desc' },
        skip: parseInt(page) * PER_PAGE,
        take: PER_PAGE,
        select: {
          listedAnimeId: true,
          animeId: true,
          animeCover: true,
          animeTitle: true,
        },
      },
    },
  });

  if (!listEntries) return res.send({ data: [], lastPage: 1 });

  res.send({ data: listEntries.listedAnimes, lastPage: Math.ceil(listEntries._count.listedAnimes / PER_PAGE) });
});

router.get('/:list_id', async (req, res) => {
  const { list_id } = req.params;
  const search = req.query.q;

  const foundEntries = await prisma.listedAnime.findMany({
    where: { listId: parseInt(list_id), animeTitle: { contains: search!.toString(), mode: 'insensitive' } },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  return res.send({ data: foundEntries });
});

router.post('/:list_id', async (req, res) => {
  const { list_id } = req.params;
  const { user_id, anime_id, anime_cover, anime_title } = req.body;

  if (!user_id || !anime_id || !anime_cover || !anime_title) return res.send({ error: 'Missing anime data' });

  const listedAnime = await prisma.listedAnime.create({
    data: {
      animeId: anime_id,
      animeCover: anime_cover,
      animeTitle: anime_title,
      userId: user_id, //* not using it now
      listId: parseInt(list_id),
    },
  });

  if (!listedAnime) return res.send({ error: "Can't save anime to list" });

  res.send({ message: 'Succesfully added anime to list' });
});

router.delete('/:list_id', async (req, res) => {
  const { list_id } = req.params;
  const { anime_id } = req.body;

  const deletedEntrie = await prisma.listedAnime.deleteMany({
    where: { AND: [{ listId: parseInt(list_id) }, { animeId: anime_id }] },
  });

  if (!deletedEntrie) return res.send({ error: "Can't delete anime from list" });

  res.send({ message: 'Succefully deleted anime from list' });
});

router.patch('/:list_id', async (req, res) => {
  const { list_id } = req.params;
  const { anime_id, new_list_id } = req.body;

  const updatedEntrie = await prisma.listedAnime.updateMany({
    where: { AND: [{ listId: parseInt(list_id) }, { animeId: anime_id }] },
    data: {
      listId: new_list_id,
    },
  });

  //* Use this
  // const updatedEntrie = await prisma.list.update({
  //   where: { listId: parseInt(list_id) },
  //   data: {
  //     listedAnimes: {
  //       update: {
  //         where: { AND: [{ listId: parseInt(list_id) }, { animeId: anime_id }] },
  //         data:{}
  //       },
  //     },
  //     // listId: new_list_id,
  //   },
  // });

  if (!updatedEntrie) return res.send({ error: "Can't move anime to list" });

  res.send({ message: 'Succesfully updated anime' });
});

export default router;
