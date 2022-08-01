import {
  ID,
  ArgsType,
  Field, Float,
} from 'type-graphql';

@ArgsType()
export default abstract class IUpdateUserbetPayload {
  @Field(() => ID)
    id: string;

  @Field(() => String)
    betId?: string;

  @Field(() => Float)
    amount?: number;

  @Field(() => Float)
    odd?: number;
}
