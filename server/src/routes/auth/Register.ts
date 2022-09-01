import { Router } from 'express';
import prisma from 'src/client';

import { v4 as uuid } from 'uuid';
import { hashSync } from 'bcrypt';
import User from 'src/types/app/user';

const router = Router();

//* Check for bad requests and already registered
router.use(async (req, res, next) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.send({ error: 'Missing Email, Password or Username' });
  }

  const user = await prisma.user.findFirst({ where: { email: email } });
  console.log(user);

  if (!user) return next();
  res.send({ error: 'User already exists' });
});

router.post('/', async (req, res) => {
  console.log('register');

  const { email, password, username } = req.body;
  const avatar = getAvatar(req.files?.avatar);
  const hashedPassword = hashPassword(password);

  if (!hashedPassword) return res.send({ error: "Can't hash password" });

  const savedUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      username,
      avatar,
      lists: {
        //* Create user default lists
        createMany: {
          data: [
            { name: 'Watching', code: 1 },
            { name: 'Planning', code: 2 },
            { name: 'Completed', code: 3 },
            { name: 'Dropped', code: 4 },
          ],
        },
      },
    },
    select: { userId: true, email: true, username: true, avatar: true },
  });

  if (!savedUser) return res.send({ error: "Can't register user" });

  const user = new User(savedUser);

  //* Update session
  req.session.user = savedUser.userId;
  res.send({ message: 'User registered succesfully', user });
});

const getAvatar = (file: any): string | undefined => {
  const avatar = file?.mimetype?.startsWith('image/') ? file : null;

  //* Rename and move avatar
  let avatarName: string | undefined;

  if (avatar) {
    const avatarId = uuid(); //* Generate uuid
    avatarName = `${avatarId}.${avatar.mimetype.replace('image/', '')}`; //* Get extension

    const path = `${__dirname}/static/avatars/${avatarName}`;
    avatar.mv(path, (err: any) => {
      if (err) console.log(err);
    });
  }
  //*

  return avatarName;
};

const hashPassword = (password: string) => {
  const saltRounds = 10;
  //* Crypt password
  const hashedPassword = hashSync(password, saltRounds);

  if (!hashedPassword) {
    return null;
  }
  return hashedPassword;
};

export default router;
