import 'reflect-metadata';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export default abstract class IArticle {
  @Field(() => ID)
    id: string;

  @Field(() => String)
    category: string;

  @Field(() => String)
    title: string;

  @Field(() => Date)
    date: Date;

  @Field(() => String)
    contents: string;

  @Field(() => String)
    img: string;
}
