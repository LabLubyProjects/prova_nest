import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GameService } from './game.service';
import { Game } from './entities/game.entity';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Resolver(() => Game)
export class GameResolver {
  constructor(private readonly gameService: GameService) {}

  @Roles('admin')
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => Game)
  async createGame(
    @Args('createGameInput') createGameInput: CreateGameInput,
  ): Promise<Game> {
    const response = await this.gameService.create(createGameInput);
    return response;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Game], { name: 'game' })
  findAll() {
    return this.gameService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Game, { name: 'game' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.gameService.findOne(id);
  }

  @Roles('admin')
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => Game)
  updateGame(@Args('updateGameInput') updateGameInput: UpdateGameInput) {
    return this.gameService.update(updateGameInput.id, updateGameInput);
  }

  @Roles('admin')
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => Game)
  removeGame(@Args('id', { type: () => String }) id: string) {
    return this.gameService.remove(id);
  }
}
