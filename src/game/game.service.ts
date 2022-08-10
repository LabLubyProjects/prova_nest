import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { Game } from './entities/game.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game) private gameRepository: Repository<Game>,
  ) {}

  async create(createGameInput: CreateGameInput): Promise<Game> {
    if (
      await this.gameRepository.findOne({
        where: { type: createGameInput.type },
      })
    )
      throw new UnprocessableEntityException(
        'A game with this type already exists',
      );

    const newGame = this.gameRepository.create(createGameInput);
    await this.gameRepository.save(newGame);
    return newGame;
  }

  findAll() {
    return `This action returns all game`;
  }

  async findOne(id: string): Promise<Game> {
    const game = await this.gameRepository.findOneBy({ id: id });
    if (!game) throw new NotFoundException('Game not found');
    return game;
  }

  async update(id: string, updateGameInput: UpdateGameInput): Promise<Game> {
    const gameToUpdate = this.findOne(id);
    return this.gameRepository.save({ ...gameToUpdate, ...updateGameInput });
  }

  async remove(id: string): Promise<Game> {
    const gameToDelete = await this.findOne(id);
    const isDeleted = await this.gameRepository.delete(gameToDelete.id);
    if (!isDeleted)
      throw new InternalServerErrorException('Could not delete game');
    return gameToDelete;
  }
}
