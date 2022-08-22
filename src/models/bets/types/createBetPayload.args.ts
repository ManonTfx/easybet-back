import 'reflect-metadata';
import {
  Field, Float, ArgsType,
} from 'type-graphql';

@ArgsType()
export default abstract class ICreateBetPayload {
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
    result?: number;

  @Field(() => String)
    date: string;
}
