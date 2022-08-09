import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Bet } from 'src/bet/entities/bet.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Game {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  type: string;

  @Column()
  description: string;

  @Column()
  range: number;

  @Column()
  price: number;

  @Column()
  minAndMaxNumber: number;

  @Column()
  color: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Bet, (bet) => bet.game)
  bets: Bet[];
}
