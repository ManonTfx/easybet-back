import 'reflect-metadata';
import { ObjectType, Field, ID } from 'type-graphql';
import { IRole } from './userRole.enum';

@ObjectType()
export default abstract class IUser {
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

  @Field()
    createdAt: Date;

  @Field()
    updatedAt: Date;

  @Field(() => String)
    avatar: string;

  @Field()
    role: IRole;
}
