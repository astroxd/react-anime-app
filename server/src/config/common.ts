import { Router } from 'express';
import { json, urlencoded } from 'express';
import cors from 'cors';
import app from 'src';

const router = Router();

router.use(json());
router.use(urlencoded({ extended: true }));
router.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    credentials: true,
  })
);

export default router;
