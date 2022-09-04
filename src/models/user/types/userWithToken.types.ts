import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export default abstract class IUserWithToken {
  @Field(() => ID)
    id: string;

  @Field(() => String)
    email: string;

  @Field(() => String)
    password: string;

  @Field(() => String)
    firstName: string;

  @Field(() => String)
    lastName: string;

  @Field(() => Date)
    createdAt: Date;

  @Field(() => Date)
    updatedAt: Date;

  @Field(() => String)
    token: string;

  @Field(() => String)
    role: string;

  @Field(() => String)
    avatar: string;
}
