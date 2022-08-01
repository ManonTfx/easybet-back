import BetPrismaDto from './dto/betDto.prisma';
import IBet from './types/bet.types';
import ICreateBetPayload from './types/createBetPayload.args';
import IUpdateBetPayload from './types/updateBetPayload.args';

export default function BetService() {
  // ** CREATE
  async function createBet(payload: ICreateBetPayload): Promise<IBet> {
    const bet = await BetPrismaDto().createBet(payload);
    if (!bet) {
      throw new Error('Bet not found');
    }
    return bet;
  }
  // ** UPDATE
  async function updateBet(payload: IUpdateBetPayload, id: string): Promise<IBet> {
    const bet = await BetPrismaDto().updateBet(payload, { id });
    if (!bet) {
      throw new Error('Bet not found');
    }
    return bet;
  }
  // ** READ
  async function allBets(): Promise<IBet[]> {
    const bet = await BetPrismaDto().getAllBets();
    if (!bet) {
      throw new Error('No Bets found');
    }
    return bet;
  }

  async function findBetById(id: string): Promise<IBet> {
    const bet = await BetPrismaDto().oneBetById({ id });
    if (!bet) {
      throw new Error('Bet not found');
    }
    return bet;
  }

  // ** DELETE
  async function deleteBetById(id: string): Promise<IBet> {
    const bet = await BetPrismaDto().deleteOneBetById({ id });
    if (!bet) {
      throw new Error('bet not found');
    }
    return bet;
  }

  return {
    allBets,
    findBetById,
    deleteBetById,
    createBet,
    updateBet,
  };
}
