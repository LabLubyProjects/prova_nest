import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GameService } from './game.service';
import { Game } from './entities/game.entity';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { PaginateInput } from 'src/helpers/paginate.input';

@Resolver(() => Game)
export class GameResolver {
  constructor(private readonly gameService: GameService) {}

  @Roles('admin')
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => Game)
  async createGame(@Args('data') data: CreateGameInput): Promise<Game> {
    const response = await this.gameService.create(data);
    return response;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Game], { name: 'games' })
  findAll(@Args('pagination', { nullable: true }) pagination: PaginateInput) {
    return this.gameService.findAll(pagination);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Game, { name: 'game' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.gameService.findOne(id);
  }

  @Roles('admin')
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => Game)
  updateGame(@Args('data') data: UpdateGameInput) {
    return this.gameService.update(data.id, data);
  }

  @Roles('admin')
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => Game)
  removeGame(@Args('id', { type: () => String }) id: string) {
    return this.gameService.remove(id);
  }
}
