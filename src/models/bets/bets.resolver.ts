import {
  Resolver, Query, Arg, Mutation, Args,
} from 'type-graphql';
import IBet from './types/bet.types';
import ICreateBetPayload from './types/createBetPayload.args';
import BetService from './bet.service';
import IUpdateBetPayload from './types/updateBetPayload.args';

@Resolver(() => IBet)
export default class BetResolver {
  // ** CREATE
  @Mutation(() => IBet)
  async createBet(@Args() payload: ICreateBetPayload): Promise<IBet> {
    return BetService().createBet(payload);
  }

  // ** UPDATE
  @Mutation(() => IBet)
  async updateBet(@Arg('payload') payload: IUpdateBetPayload, @Arg('id') id: string): Promise<IBet> {
    return BetService().updateBet(payload, id);
  }

  // ** READ
  @Query(() => [IBet])
  async getAllBets(): Promise<IBet[]> {
    return BetService().allBets();
  }

  @Query(() => IBet)
  async getBetByID(
    @Arg('id') id: string,
  ): Promise<IBet> {
    return BetService().findBetById(id);
  }

  // ** DELETE
  @Mutation(() => IBet)
  async deleteTagById(
    @Arg('id') id: string,
  ): Promise<IBet> {
    return BetService().deleteBetById(id);
  }
}
