import express from 'express';
import prisma from 'src/client';

import { v4 as uuid } from 'uuid';
import { hashSync } from 'bcrypt';

const router = express.Router();

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

  if (hashedPassword === null) return res.send({ error: "Can't hash password" });

  const savedUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      username,
      avatar,
    },
    select: {
      userId: true,
    },
  });

  if (savedUser === null) return res.send({ error: "Can't register user" });

  const user = {
    userId: savedUser.userId,
    email,
    username,
    //* If avatar is null return image based on username
    avatar: avatar
      ? `http://localhost:3001/api/static/avatars/${avatar}`
      : `https://avatars.dicebear.com/api/initials/${username}.svg`,
  };

  req.session.user = savedUser.userId;

  res.send({ message: 'User registered succesfully', user });

  //   //* Create user default lists
  //   createDefaultUserLists(user.id);
  // });
  // //*

  // client.release();
});

const getAvatar = (file: any): string => {
  const avatar = file?.mimetype?.startsWith('image/') ? file : null;

  //* Rename and move avatar
  let avatarName;

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
