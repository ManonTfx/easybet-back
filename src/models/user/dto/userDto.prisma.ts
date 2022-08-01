import {
  Prisma, User,
} from '@prisma/client';
import SignupArgs from '../../../auth/args/signup.args';
import { prisma } from '../../../utils/prisma';
import IUserPayload from '../types/payload.args';
import { IRole } from '../types/userRole.enum';

export default function UserPrismaDto() {
  // ** CREATE
  async function createOne(args: SignupArgs) {
    return prisma.user.create({
      data: {
        ...args,
      },
    });
  }

  // ** READ
  async function all(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async function oneById(
    id: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return prisma.user.findUnique({
      where: id,
    });
  }

  async function oneByEmail(
    email: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return prisma.user.findUnique({
      where: email,
    });
  }

  // ** UPDATE USER INFOS
  async function updateUser(
    payload: IUserPayload,
    id: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return prisma.user.update({
      where: id,
      data: {
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
      },
    });
  }

  // ** UPDATE USER ROLE
  async function updateUserRole(
    id: Prisma.UserWhereUniqueInput,
    role: IRole,
  ): Promise<User | null> {
    return prisma.user.update({
      where: id,
      data: {
        role,
      },
    });
  }

  // ** UPDATE USER PASSWORD
  async function updateUserPassword(
    id: Prisma.UserWhereUniqueInput,
    hashedPassword: string,
  ): Promise<User | null> {
    return prisma.user.update({
      where: id,
      data: {
        password: hashedPassword,
      },
    });
  }

  // ** DELETE
  async function deleteOneById(
    id: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return prisma.user.delete({
      where: id,
    });
  }

  return {
    createOne,
    all,
    oneById,
    oneByEmail,
    deleteOneById,
    updateUser,
    updateUserPassword,
    updateUserRole,
  };
}
