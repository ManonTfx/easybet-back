import 'reflect-metadata';
import {
  Resolver, Query, Mutation, Args, Arg,
} from 'type-graphql';
import ICreateUserbetPayload from './types/createUserBetPayload.args';
import IUpdateUserbetPayload from './types/updateUserBetPayload.args';
import IUserBet from './types/userBet.type';
import UserBetService from './userBet.service';

// CREATE method is handled in the Auth Models
@Resolver(() => IUserBet)
export default class UserbetResolver {
  // * READ
  @Query(() => [IUserBet])
  async getAllUserBets(): Promise<IUserBet[]> {
    return UserBetService().allUserBets();
  }

  // ** CREATE
  @Mutation(() => IUserBet)
  async createUserBet(@Args() payload: ICreateUserbetPayload): Promise<IUserBet> {
    return UserBetService().createUserBet(payload);
  }

  // ** UPDATE
  @Mutation(() => IUserBet)
  async updateUserBet(
    @Args()payload: IUpdateUserbetPayload,
      @Arg('id') id: string,
  ):Promise<IUserBet |null> {
    return UserBetService().updateUserbetById(payload, id);
  }

  // ** DELETE
  @Mutation(() => IUserBet)
  async deleteUserBetById(
    @Arg('id') id: string,
  ): Promise<IUserBet> {
    return UserBetService().deleteUserbetById(id);
  }
}
