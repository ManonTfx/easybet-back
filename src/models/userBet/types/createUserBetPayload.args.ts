import {
  ArgsType,
  Field, Float,
} from 'type-graphql';

@ArgsType()
export default abstract class ICreateUserbetPayload {
  @Field(() => String)
    userId: string;

  @Field(() => String)
    betId: string;

  @Field(() => Float)
    amount: number;

  @Field(() => Float)
    odd: number;
}
