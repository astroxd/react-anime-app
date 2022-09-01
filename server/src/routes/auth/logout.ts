import Router from 'express';

const router = Router();

//* LOGOUT user
router.post('/', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.send({ error: "Can't destroy session" });

    res.send({ message: 'User logout successfully', user: {} });
  });
});

export default router;
