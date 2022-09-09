import { Router } from 'express';
import prisma from 'src/client';

const router = Router();

//* Get favorites
router.get('/:user_id/:page', async (req, res) => {
  const { user_id, page } = req.params;

  const PER_PAGE = 4;

  const favorites = await prisma.user.findFirst({
    where: { userId: parseInt(user_id) },
    select: {
      _count: {
        select: { favoriteAnimes: { where: { userId: parseInt(user_id) } } },
      },
      favoriteAnimes: {
        orderBy: { addedAt: 'desc' },
        skip: (parseInt(page) - 1) * PER_PAGE,
        take: PER_PAGE,
        select: { animeCover: true, animeTitle: true, animeId: true },
      },
    },
  });

  if (!favorites) return res.send({ data: [], lastPage: 1 });

  res.send({ data: favorites.favoriteAnimes, lastPage: Math.ceil(favorites._count.favoriteAnimes / PER_PAGE) });
});

//* Add Favorite
router.post('/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const { anime_id, anime_cover, anime_title } = req.body;

  if (!anime_id || !anime_cover || !anime_title) return res.send({ error: 'Missing anime data' });

  const favorite = await prisma.favoriteAnime.create({
    data: {
      animeId: anime_id,
      animeCover: anime_cover,
      animeTitle: anime_title,
      userId: parseInt(user_id),
    },
  });

  if (!favorite) return res.send({ error: "Can't save anime to favorites" });

  res.send({ message: 'Succesfully added anime to favorites' });
});

//* Remove from Favorites
router.delete('/:user_id/:anime_id', async (req, res) => {
  const { user_id, anime_id } = req.params;

  const deletedFavorite = await prisma.favoriteAnime.delete({
    where: { userId_animeId: { userId: parseInt(user_id), animeId: parseInt(anime_id) } },
  });

  if (!deletedFavorite) return res.send({ error: "Can't remove anime from favorites" });

  res.send({ message: 'Succefully removed anime from favorites' });
});

//* Check if Favorite
router.get('/entrie/:user_id/:anime_id', async (req, res) => {
  const { user_id, anime_id } = req.params;

  const isInFavorites = await prisma.favoriteAnime.findFirst({
    where: { AND: [{ userId: parseInt(user_id) }, { animeId: parseInt(anime_id) }] },
  });

  if (!isInFavorites) return res.send({ isInFavorites: false });
  res.send({ isInFavorites: true });
});

//* Search favorite
router.get('/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const search = req.query.q;

  const foundFavorites = await prisma.favoriteAnime.findMany({
    where: { userId: parseInt(user_id), animeTitle: { contains: search!.toString(), mode: 'insensitive' } },
    orderBy: {
      addedAt: 'desc',
    },
  });

  return res.send({ data: foundFavorites });
});

export default router;
