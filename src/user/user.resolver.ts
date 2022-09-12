import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { UserService } from './user.service'
import { User } from './user.entity'
import { CreateUserInput } from './dto/create-user.dto'
import { UpdateUserInput } from './dto/update-user.dto'

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  async users() {
    return this.userService.findAllUsers()
  }

  @Query(() => User)
  async user(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.userService.findOneUserById(id)
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput) {
    return this.userService.createNewUser(input)
  }

  @Mutation(() => User)
  async updateUserById(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateUserInput,
  ): Promise<User> {
    return this.userService.updateUserById(id, input)
  }

  @Mutation(() => Boolean)
  async deleteUserById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    return this.userService.deleteOneUserById(id)
  }
}
