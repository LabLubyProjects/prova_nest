import { Module } from '@nestjs/common';
import { BetService } from './bet.service';
import { BetResolver } from './bet.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bet } from './entities/bet.entity';
import { CartService } from 'src/cart/cart.service';
import { GameService } from 'src/game/game.service';
import { UserService } from 'src/user/user.service';
import { Cart } from 'src/cart/entities/cart.entity';
import { User } from 'src/user/entities/user.entity';
import { Game } from 'src/game/entities/game.entity';
import { RoleService } from 'src/role/role.service';
import { Role } from 'src/role/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bet, Cart, User, Game, Role])],
  providers: [
    BetService,
    BetResolver,
    CartService,
    GameService,
    UserService,
    RoleService,
  ],
})
export class BetModule {}
