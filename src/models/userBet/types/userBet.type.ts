import 'reflect-metadata';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export default abstract class IUserBet {
  @Field(() => ID)
    id: string;

  @Field(() => String)
    userId: string;

  @Field(() => String)
    betId: string;

  @Field(() => Number)
    amount: number;

  @Field(() => Number)
    odd: number;
}
