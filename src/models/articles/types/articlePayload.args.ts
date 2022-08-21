import 'reflect-metadata';
import {
  Field, ArgsType,
} from 'type-graphql';

@ArgsType()
export default abstract class IArticlePayload {
  @Field(() => String)
    category: string;

  @Field(() => String)
    title: string;

  @Field(() => String)
    contents: string;

  @Field(() => String)
    img: string;

  @Field(() => String)
    userId: string;
}
