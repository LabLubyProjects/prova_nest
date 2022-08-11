import { Module } from '@nestjs/common';
import { BetService } from './bet.service';
import { BetResolver } from './bet.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bet } from './entities/bet.entity';
import { CartService } from 'src/cart/cart.service';
import { GameService } from 'src/game/game.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bet])],
  providers: [BetService, BetResolver, CartService, GameService],
})
export class BetModule {}
