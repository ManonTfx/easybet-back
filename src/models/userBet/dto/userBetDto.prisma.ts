import { UserBet, Prisma } from '@prisma/client';
import { prisma } from '../../../utils/prisma/prisma-client';
import ICreateUserbetPayload from '../types/createUserBetPayload.args';
import IUpdateUserbetPayload from '../types/updateUserBetPayload.args';

export default function UserPrismaDto() {
  // ** READ
  async function getAll(): Promise<UserBet[]> {
    return prisma.userBet.findMany();
  }

  // ** READ ONE
  async function oneUserBetById(
    id: Prisma.UserBetWhereUniqueInput,
  ): Promise<UserBet | null> {
    return prisma.userBet.findUnique({
      where: id,
    });
  }

  // ** CREATE
  async function createUserbet(payload: ICreateUserbetPayload) {
    return prisma.userBet.create({
      data: {
        ...payload,
      },
    });
  }

  // ** UPDATE
  async function updateUserbet(
    payload: IUpdateUserbetPayload,
    id: Prisma.UserWhereUniqueInput,
  ): Promise<UserBet | null> {
    return prisma.userBet.update({
      where: id,
      data: {
        betId: payload.betId,
        amount: payload.amount,
        odd: payload.odd,
      },
    });
  }

  // ** DELETE
  async function deleteOneUserBetById(
    id: Prisma.UserWhereUniqueInput,
  ): Promise<UserBet | null> {
    return prisma.userBet.delete({
      where: id,
    });
  }

  return {
    getAll,
    createUserbet,
    updateUserbet,
    deleteOneUserBetById,
    oneUserBetById,
  };
}
