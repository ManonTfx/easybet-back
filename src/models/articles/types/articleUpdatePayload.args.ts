import {
  Field, ID, InputType,
} from 'type-graphql';

@InputType()
export default abstract class IUpdateArticlePayload {
  @Field(() => ID, { nullable: true })
    id?: string;

  @Field(() => String, { nullable: true })
    category?: string;

  @Field(() => String, { nullable: true })
    title?: string;

  @Field(() => String, { nullable: true })
    contents?: string;

  @Field(() => String, { nullable: true })
    img?: string;

  @Field(() => String, { nullable: true })
    userId?: string;
}
