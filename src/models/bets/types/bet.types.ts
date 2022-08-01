import 'reflect-metadata';
import IUserBet from 'src/models/userBet/types/userBet.type';
import {
  ObjectType, Field, ID, Float,
} from 'type-graphql';

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

  @Field(() => Boolean, { nullable: true })
    result?: boolean | null;

  @Field(() => String)
    date: String;

  @Field(() => Date)
    createdAt: Date;

  @Field(() => [IUserBet])
    UserBet: IUserBet[];
}
