import 'reflect-metadata';
import {
  Field, Float, ArgsType,
} from 'type-graphql';

@ArgsType()
export default abstract class IArticlePayload {
  @Field(() => String)
    category: string;

  @Field(() => String)
    title: string;

  @Field(() => String)
    contents: string;

  @Field(() => Float)
    img: string;
}
