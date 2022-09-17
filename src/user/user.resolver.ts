import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  /**
   * Find all users.
   * @public
   *
   * @return {User} list of all users.
   */
  @Query(() => [User])
  public async users(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  /**
   * Find one user.
   * @public
   * @param {number} id identification of user.
   *
   * @return {User} details of one user.
   */
  @Query(() => User)
  public async user(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<User> {
    return this.userService.findOneUserById(id);
  }

  /**
   * Create a new user.
   * @public
   * @param {CreateUserDto} input user data to create new user.
   *
   * @return {User} details of created user.
   */
  @Mutation(() => User)
  public async createUser(@Args('input') input: CreateUserDto) {
    return this.userService.createNewUser(input);
  }

  @Mutation(() => User)
  public async updateUserById(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUserById(id, input);
  }

  /**
   * Delete one user.
   * @public
   * @param {int} id identification of user.
   *
   * @return {bool} status of action for delete user.
   */
  @Mutation(() => Boolean)
  public async deleteUserById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    return this.userService.deleteOneUserById(id);
  }
}
