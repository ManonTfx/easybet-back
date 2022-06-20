import UserBetPrismaDto from './dto/userBetDto.prisma';
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

  return {
    allUserBets,
  };
}
