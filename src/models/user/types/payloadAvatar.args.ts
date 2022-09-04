import { Field, ID, ArgsType } from 'type-graphql';

@ArgsType()
export default abstract class IUserAvatarPayload {
  @Field(() => ID)
    id: string;

  @Field(() => String)
    avatar: string;
}
