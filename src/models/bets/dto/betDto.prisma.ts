import {
  Bet,
  Prisma,
  UserBet,
} from '@prisma/client';

import { prisma } from '../../../utils/prisma';
import ICreateBetPayload from '../types/createBetPayload.args';
import IUpdateBetPayload from '../types/updateBetPayload.args';

interface BetWithDetails extends Bet {
  UserBet: UserBet[];
}

export default function BetPrismaDto() {
  // ** READ
  async function getAllBets(): Promise<BetWithDetails[]> {
    return prisma.bet.findMany({
      orderBy: {
        date: 'asc',
      },
      include: {
        UserBet: true,
      },
    });
  }

  // ** READ ONE
  async function oneBetById(
    id: Prisma.BetWhereUniqueInput,
  ): Promise<BetWithDetails | null> {
    return prisma.bet.findUnique({
      where: id,
      include: {
        UserBet: true,
      },
    });
  }

  // ** DELETE
  async function deleteOneBetById(
    id: Prisma.BetWhereUniqueInput,
  ) {
    return prisma.bet.delete({
      where: id,
      include: {
        UserBet: true,
      },
    });
  }

  // ** CREATE
  async function createBet(payload: ICreateBetPayload): Promise<BetWithDetails | null > {
    return prisma.bet.create({
      data: {
        ...payload,
      },
      include: {
        UserBet: true,
      },
    });
  }

  // ** UPDATE
  async function updateBet(payload: IUpdateBetPayload, id : Prisma.BetWhereUniqueInput):
  Promise<BetWithDetails | null > {
    return prisma.bet.update({
      where: id,
      data: {
        ...payload,
      },
      include: {
        UserBet: true,
      },
    });
  }

  return {
    getAllBets,
    oneBetById,
    deleteOneBetById,
    createBet,
    updateBet,
  };
}
