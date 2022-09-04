import IUser from '../models/user/types/user.type';

const dummies: IUser[] = [
  {
    id: '1',
    email: 'manon.test@gmail.com',
    password: 'hellooo',
    firstName: 'Manon',
    lastName: 'Tréfoux',
    createdAt: new Date(),
    updatedAt: new Date(),
    role: 'SUPERADMIN',
    avatar: '',
  },
];

// eslint-disable-next-line import/prefer-default-export
export { dummies };
