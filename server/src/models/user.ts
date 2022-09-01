interface IUser {
  id: number;
  email: string;
  username: string;
  avatar: string | null;
}

class User implements IUser {
  id: number;
  email: string;
  username: string;
  avatar: string | null;

  constructor(prismaUser?: any) {
    this.id = prismaUser.userId;
    this.email = prismaUser.email;
    this.username = prismaUser.email;
    this.avatar = prismaUser.avatar
      ? `http://localhost:3001/api/static/avatars/${prismaUser.avatar}`
      : `https://avatars.dicebear.com/api/initials/${prismaUser.username}.svg`;
  }
}

export default User;
