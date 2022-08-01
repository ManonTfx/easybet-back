import UserBetPrismaDto from './dto/userBetDto.prisma';
import ICreateUserbetPayload from './types/createUserBetPayload.args';
import IUpdateUserbetPayload from './types/updateUserBetPayload.args';
import IUserBet from './types/userBet.type';

export default function UserService() {
  // ** READ
  async function allUserBets(): Promise<IUserBet[]> {
    const users = await UserBetPrismaDto().getAll();
    if (!users) {
      throw new Error('No users found');
    }
    return users;
  }

  // ** CREATE
  async function createUserBet(args: ICreateUserbetPayload): Promise<IUserBet> {
    const userBet = await UserBetPrismaDto().createUserbet(args);
    return userBet;
  }

  // ** UPDATE
  async function updateUserbetById(
    payload: IUpdateUserbetPayload,
    id: string,
  ): Promise<IUserBet |null > {
    const user = await UserBetPrismaDto().updateUserbet(payload, { id });
    return user;
  }

  // ** DELETE
  async function deleteUserbetById(id: string): Promise<IUserBet> {
    const user = await UserBetPrismaDto().deleteOneUserBetById({ id });
    if (!user) {
      throw new Error('Userbet not found');
    }
    return user;
  }
  return {
    allUserBets,
    createUserBet,
    updateUserbetById,
    deleteUserbetById,
  };
}
