import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import 'dayjs/locale/pt-br';
import { DateTime } from 'luxon';
import { produce } from 'src/messaging/kafka';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { UpdateCartInput } from './dto/update-cart.input';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
  private readonly logger = new Logger(CartService.name);

  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    private readonly userService: UserService,
  ) {}

  @Cron('0 0 9 * * *')
  async handleTimeInCart() {
    dayjs.extend(isLeapYear);
    dayjs.locale('pt-br');

    const usersWithBets = await this.userService.findAllWithBets();

    await Promise.all(
      usersWithBets.map(async (userWithBet) => {
        if (userWithBet.bets.length === 0) {
          await produce(userWithBet, 'new-bet-new-users');
          return this.logger.log('Reminder email sent successfully');
        }
        userWithBet.bets.sort(
          (a, b) =>
            DateTime.fromJSDate(b.created_at).toUnixInteger() -
            DateTime.fromJSDate(a.created_at).toUnixInteger(),
        );

        const { created_at } = userWithBet.bets[0];

        const lastBetPlusOneWeek = dayjs(created_at).add(7, 'd').format();
        const currentDate = dayjs().format();
        if (lastBetPlusOneWeek < currentDate) {
          await produce(userWithBet, 'new-bet-by-week');
          return this.logger.log('Reminder email sent successfully');
        }
      }),
    );
  }

  async findOnly(): Promise<Cart> {
    const [cart] = await this.cartRepository.find();
    if (!cart) throw new NotFoundException('Cart not found');
    return cart;
  }

  async update(updateCartInput: UpdateCartInput): Promise<Cart> {
    const cart = await this.findOnly();
    cart.min_cart_value = updateCartInput.minCartValue;
    return await this.cartRepository.save(cart);
  }
}
