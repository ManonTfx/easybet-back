import { UserBet } from '@prisma/client';
import { prisma } from '../../../utils/prisma/prisma-client';

export default function UserPrismaDto() {
  // ** READ
  async function getAll(): Promise<UserBet[]> {
    return prisma.userBet.findMany();
  }

  return {
    getAll,
  };
}
