import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { SelfUserGuard } from 'src/auth/guards/self-user.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInput): Promise<User> {
    const response = await this.userService.create(data);
    return response;
  }

  @Roles('admin')
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Query(() => [User], { name: 'user' })
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(GqlAuthGuard, SelfUserGuard)
  @Mutation(() => User)
  async updateUser(@Args('data') data: UpdateUserInput): Promise<User> {
    const response = await this.userService.update(data.id, data);
    return response;
  }

  @UseGuards(GqlAuthGuard, SelfUserGuard)
  @Mutation(() => User)
  async removeUser(
    @Args('id', { type: () => String }) id: string,
  ): Promise<User> {
    return this.userService.remove(id);
  }

  @Roles('admin')
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => User)
  async grantRoles(
    @Args('id', { type: () => String }) id: string,
    @Args('roles', { type: () => [String] }) roles: string[],
  ): Promise<User> {
    return this.userService.grantRoles(id, roles);
  }
}
