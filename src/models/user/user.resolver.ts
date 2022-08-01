import authGuard from 'src/auth/guards/auth.guards';
import { IContext } from 'src/utils/context/interface/context.interface';
import {
  Resolver, Query, Arg, Mutation, UseMiddleware, Ctx, Args,
} from 'type-graphql';

import IUserPayload from './types/payload.args';
import IUserPasswordPayload from './types/payloadPassword.types';
import IUserRolePayload from './types/paylodRole.types';
import IUser from './types/user.type';
import UserService from './user.service';

@Resolver(() => IUser)
export default class UserResolver {
  // CREATE method is handled in the Auth Models

  // * READ
  @Query(() => [IUser])
  async getAllUsers(): Promise<IUser[]> {
    return UserService().allUsers();
  }

  @Query(() => IUser)
  async getSelf(
    @Ctx() context: IContext,
  ): Promise<IUser> {
    return UserService().findById(context.userId || '');
  }

  @Query(() => IUser)
  async getUserByID(
    @Arg('id') id: string,
  ): Promise<IUser> {
    return UserService().findById(id);
  }

  @Query(() => IUser)
  async getUserByEmail(
    @Arg('email') email: string,
  ): Promise<IUser> {
    return UserService().findByEmail(email);
  }

  // * UPDATE
  @Mutation(() => IUser)
  @UseMiddleware(authGuard)
  async updateUser(
    @Args()payload: IUserPayload,
      @Arg('id') id: string,
  ):Promise<IUser |null> {
    return UserService().updateUserById(payload, id);
  }

  // * UPDATE USER ROLE
  @Mutation(() => IUser)
  async updateUserRole(
    @Args()payload: IUserRolePayload,
      @Arg('id') id: string,
  ):Promise<IUser |null | undefined> {
    return UserService().updateUserRole(payload, id);
  }

  // * UPDATE USER PASSWORD
  @Mutation(() => IUser)
  @UseMiddleware(authGuard)
  async updateUserPassword(
    @Args()payload: IUserPasswordPayload,
      @Arg('id') id: string,
  ):Promise<IUser |null | undefined> {
    return UserService().updateUserPassword(payload, id);
  }

  // * DELETE
  @Mutation(() => IUser)
  async deleteUserById(
    @Arg('id') id: string,
  ): Promise<IUser> {
    return UserService().deleteById(id);
  }
}
