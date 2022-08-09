import { ObjectType } from '@nestjs/graphql';
import { Game } from 'src/game/entities/game.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Bet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column()
  // user_id: string;

  // @Column()
  // game_id: string;

  @Column()
  numbers: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.bets)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Game, (game) => game.bets)
  @JoinColumn({ name: 'game_id' })
  game: Game;
}