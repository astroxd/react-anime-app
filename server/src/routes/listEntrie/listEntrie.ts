import { Router } from 'express';
import prisma from 'src/client';

const router = Router();

//* Get ListedAnimes
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
        skip: (parseInt(page) - 1) * PER_PAGE,
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

//* Add to List
router.post('/:list_id', async (req, res) => {
  const { list_id } = req.params;
  const { user_id, anime_id, anime_cover, anime_title } = req.body;

  if (!user_id || !anime_id || !anime_cover || !anime_title) return res.send({ error: 'Missing anime data' });

  const listedAnime = await prisma.listedAnime.create({
    data: {
      animeId: anime_id,
      animeCover: anime_cover,
      animeTitle: anime_title,
      userId: user_id,
      listId: parseInt(list_id),
    },
  });

  if (!listedAnime) return res.send({ error: "Can't save anime to list" });

  res.send({ message: 'Succesfully added anime to list' });
});

//* Remove from List
router.delete('/:list_id/:anime_id', async (req, res) => {
  const { list_id, anime_id } = req.params;

  const deletedEntrie = await prisma.listedAnime.delete({
    where: { listId_animeId: { listId: parseInt(list_id), animeId: parseInt(anime_id) } },
  });

  if (!deletedEntrie) return res.send({ error: "Can't delete anime from list" });

  res.send({ message: 'Succefully deleted anime from list' });
});

//* Change ListedAnime's List
router.patch('/:list_id', async (req, res) => {
  const { list_id } = req.params;
  const { anime_id, new_list_id } = req.body;

  const updatedEntrie = await prisma.listedAnime.update({
    where: { listId_animeId: { listId: parseInt(list_id), animeId: anime_id } },
    data: {
      listId: new_list_id,
    },
  });

  if (!updatedEntrie) return res.send({ error: "Can't move anime to list" });

  res.send({ message: 'Succesfully updated anime' });
});

//* Check if in CodeList
router.get('/entrie/:user_id/:anime_id', async (req, res) => {
  const { user_id, anime_id } = req.params;

  //* Will give multiple lists when user custom lists will be added
  //* Now it finds just one list which is the codeList itself
  const entrieLists = await prisma.listedAnime.findMany({
    where: { AND: [{ userId: parseInt(user_id) }, { animeId: parseInt(anime_id) }] },
    select: { listId: true },
  });

  let codeList;
  for (let i = 0; i < entrieLists.length; i++) {
    const savedCodeList = await prisma.list.findFirst({
      where: { AND: [{ listId: entrieLists[i].listId }, { code: { not: null } }] },
      select: { code: true, name: true, listId: true },
    });

    if (savedCodeList) {
      codeList = savedCodeList;
      break;
    }
  }
  res.send({ lists: entrieLists, codeList: codeList });
});

//* Search ListedAnime
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
export default router;
