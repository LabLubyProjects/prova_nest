import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoggedUser } from 'src/auth/decorators/logged-user.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { GqlAuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { User } from 'src/user/entities/user.entity';
import { BetService } from './bet.service';
import { CreateBetInput } from './dto/create-bet.input';
import { Bet } from './entities/bet.entity';

@Resolver(() => Bet)
export class BetResolver {
  constructor(private readonly betsService: BetService) {}

  @Roles('admin')
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Query(() => [Bet], { name: 'bets' })
  findAll() {
    return this.betsService.findAll();
  }

  @Roles('admin')
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Query(() => Bet, { name: 'bet' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return this.betsService.findOne(id);
  }

  @Roles('player')
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => String)
  async createBet(
    @Args('data') data: CreateBetInput,
    @LoggedUser() user: User,
  ): Promise<string> {
    await this.betsService.createBet(data, user);
    return 'Bets saved successfully';
  }
}
