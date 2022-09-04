import { AuthenticationError, UserInputError } from 'apollo-server-core';
import SignupArgs from 'src/auth/args/signup.args';
import { comparePassword, hashPassword } from 'src/utils/auth/bcrypt';
import { log } from '../../utils/logger/logger';
import UserPrismaDto from './dto/userDto.prisma';
import IUserPayload from './types/payload.args';
import IUserAvatarPayload from './types/payloadAvatar.args';
import IUserPasswordPayload from './types/payloadPassword.types';
import IUserRolePayload from './types/paylodRole.types';
import IUser from './types/user.type';

export default function UserService() {
  // ** CREATE
  async function createOneUser(args: SignupArgs): Promise<IUser> {
    const user = await UserPrismaDto().createOne(args);
    return user;
  }

  // ** UPDATE USER INFOS
  async function updateUserById(
    payload: IUserPayload,
    id: string,
  ): Promise<IUser |null > {
    const user = await UserPrismaDto().updateUser(payload, { id });
    return user;
  }

  // ** UPDATE USER ROLE
  // eslint-disable-next-line consistent-return
  async function updateUserRole(payload: IUserRolePayload,
    id: string): Promise<IUser | null | undefined> {
    const updatedUserRole = await UserPrismaDto().updateUserRole({ id }, payload.role);
    return updatedUserRole;
  }

  // ** UPDATE USER AVATAR
  // eslint-disable-next-line consistent-return
  async function updateUserAvatar(payload: IUserAvatarPayload,
    id: string): Promise<IUser | null | undefined> {
    const updatedUserRole = await UserPrismaDto().updateUserAvatar({ id }, payload.avatar);
    return updatedUserRole;
  }

  // ** UPDATE USER PASSWORD
  // eslint-disable-next-line consistent-return
  async function updateUserPassword(
    payload: IUserPasswordPayload,
    id: string,
  ): Promise<IUser | null | undefined> {
    try {
      const user = await UserPrismaDto().oneById({ id });
      if (user) {
        const valid = await comparePassword(payload.lastPassword, user.password);
        if (!valid) {
          log.warn('Incorrect password');
          throw new UserInputError('Incorrect password');
        } else {
          const hashedPassword = await hashPassword(payload.password);
          const updatedUser = await UserPrismaDto().updateUserPassword({ id }, hashedPassword);
          return updatedUser;
        }
      }
    } catch (error) {
      log.error(error);
      throw new AuthenticationError('Session expired', { error });
    }
  }

  // ** READ
  async function allUsers(): Promise<IUser[]> {
    const users = await UserPrismaDto().all();
    if (!users) {
      throw new Error('No users found');
    }
    return users;
  }

  async function findById(id: string): Promise<IUser> {
    const user = await UserPrismaDto().oneById({ id });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async function findByEmail(email: string): Promise<IUser> {
    const user = await UserPrismaDto().oneByEmail({ email });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  // ** DELETE
  async function deleteById(id: string): Promise<IUser> {
    const user = await UserPrismaDto().deleteOneById({ id });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  return {
    createOneUser,
    allUsers,
    findById,
    findByEmail,
    deleteById,
    updateUserById,
    updateUserPassword,
    updateUserRole,
    updateUserAvatar,
  };
}
