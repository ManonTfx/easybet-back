import IUser from '../models/user/types/user.type';

const dummies: IUser[] = [
  {
    id: '1',
    email: 'toto@toto.net',
    password: 'hello',
    firstName: 'Man',
    lastName: 'Tref',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// eslint-disable-next-line import/prefer-default-export
export { dummies };
