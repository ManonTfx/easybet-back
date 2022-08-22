import {
  Field, Float, ID, InputType,
} from 'type-graphql';

@InputType()
export default abstract class IUpdateBetPayload {
  @Field(() => ID, { nullable: true })
    id?: string;

  @Field(() => String, { nullable: true })
    name?: string;

  @Field(() => Float, { nullable: true })
    stake?: number;

  @Field(() => String, { nullable: true })
    bookmaker?: string;

  @Field(() => Float, { nullable: true })
    odd?: number;

  @Field(() => String, { nullable: true })
    category?: string;

  @Field(() => Float, { nullable: true })
    result?: number;

  @Field(() => String, { nullable: true })
    date?: string;

  @Field(() => String, { nullable: true })
    type: string;
}
