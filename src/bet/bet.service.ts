import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartService } from 'src/cart/cart.service';
import { GameService } from 'src/game/game.service';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateBetInput } from './dto/create-bet.input';
import { Bet } from './entities/bet.entity';

@Injectable()
export class BetService {
  constructor(
    @InjectRepository(Bet) private readonly betsRepository: Repository<Bet>,
    private readonly gameService: GameService,
    private readonly cartService: CartService,
  ) {}

  async findAll(): Promise<Bet[]> {
    return this.betsRepository.find();
  }

  async findOne(id: string): Promise<Bet> {
    const bet = await this.betsRepository.findOneBy({ id: id });
    if (!bet) throw new NotFoundException('Bet not found');
    return bet;
  }

  async createBet(createBetInput: CreateBetInput, user: User): Promise<void> {
    const { bets } = createBetInput;

    let totalCartValue = 0;
    for (const bet of bets) {
      const currentGameAnalyzed = await this.gameService.findOne(bet.game_id);
      const arrayOfBetNumbers = bet.numbers.split(',');

      if (arrayOfBetNumbers.length !== new Set(arrayOfBetNumbers).size)
        throw new BadRequestException('There are repeated numbers in a bet');

      if (arrayOfBetNumbers.length !== currentGameAnalyzed.minAndMaxNumber)
        throw new BadRequestException(
          `A bet of type ${currentGameAnalyzed.type} must have ${currentGameAnalyzed.minAndMaxNumber} numbers`,
        );

      if (
        arrayOfBetNumbers.some(
          (betNumber) => Number(betNumber) > currentGameAnalyzed.range,
        )
      )
        throw new BadRequestException('A bet has numbers out of game range');

      totalCartValue += currentGameAnalyzed.price;
    }

    const cart = await this.cartService.findOnly();
    const minimumValue = cart ? cart.min_cart_value : 30;

    if (totalCartValue < minimumValue)
      throw new BadRequestException(
        'Total value of bets is lower than cart minimum value',
      );

    await Promise.all(
      bets.map(async (bet) => {
        await this.betsRepository.manager.transaction(
          async (transactionalEntityManager) => {
            const newBet = transactionalEntityManager.create(Bet, {
              game_id: bet.game_id,
              user_id: user.id,
              numbers: bet.numbers,
            });

            await transactionalEntityManager.save(newBet);
          },
        );
      }),
    );

    //Emails and kafka part
    // try {
    //   await produce(auth.user!, 'new-bet');
    //   const allAdmins = await User.query().preload('roles');
    //   allAdmins.forEach(async (admin) => {
    //     const adminJSON = admin.serialize();
    //     if (adminJSON.roles.some((role) => role.name === 'admin'))
    //       await produce(
    //         { ...adminJSON, playerName: auth.user!.name },
    //         'new-bet-admin-report',
    //       );
    //   });
    //   //await sendEmail(auth.user!, 'email/new_bet', 'Congratulations for your new bet!')
    // } catch (error) {
    //   await transaction.rollback();
    //   return response.badRequest({
    //     statusCode: 400,
    //     message: 'Error sending new bets email',
    //   });
    // }
  }
}
