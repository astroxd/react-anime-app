import express, { Router } from 'express';
import fileUpload from 'express-fileupload';
const router = Router();

import path from 'path';

router.use(fileUpload());
console.log(__dirname);
router.use('/api/static', express.static(path.join(__dirname, '..', '/static')));

export default router;
