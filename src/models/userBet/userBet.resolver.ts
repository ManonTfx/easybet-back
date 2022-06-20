import 'reflect-metadata';
import { Resolver, Query } from 'type-graphql';
import IUserBet from './types/userBet.type';
import UserBetService from './userBet.service';

// CREATE method is handled in the Auth Models
@Resolver(() => IUserBet)
export default class UserResolver {
  // * READ
  @Query(() => [IUserBet])
  async getAllUserBets(): Promise<IUserBet[]> {
    return UserBetService().allUserBets();
  }

  // * UPDATE

  // * DELETE
}
