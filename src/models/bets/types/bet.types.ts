import 'reflect-metadata';
import {
  ObjectType, Field, ID, Float,
} from 'type-graphql';
import IUserBet from '../../userBet/types/userBet.type';

@ObjectType()
export default abstract class IBet {
  @Field(() => ID)
    id: string;

  @Field(() => String)
    name: string;

  @Field(() => Float)
    stake: number;

  @Field(() => String)
    bookmaker: string;

  @Field(() => Float)
    odd: number;

  @Field(() => String)
    category: string;

  @Field(() => Float, { nullable: true })
    result?: number | null;

  @Field(() => String)
    date: String;

  @Field(() => Date)
    createdAt: Date;

  @Field(() => [IUserBet])
    UserBet: IUserBet[];

  @Field(() => String)
    type: String;
}
