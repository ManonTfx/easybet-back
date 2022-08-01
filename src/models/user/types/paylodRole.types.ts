import { Field, ID, ArgsType } from 'type-graphql';
import { IRole } from './userRole.enum';

@ArgsType()
export default abstract class IUserRolePayload {
  @Field(() => ID)
    id: string;

  @Field(() => String)
    role: IRole;
}
