import { ObjectType, Field, ID, HideField } from '@nestjs/graphql';
import { Bet } from 'src/bet/entities/bet.entity';
import { hashPassword } from 'src/helpers/crypto';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../role/entities/role.entity';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  email: string;

  @Column({
    transformer: hashPassword,
  })
  @HideField()
  password: string;

  @Column()
  @HideField()
  password_recovery_token?: string;

  @Column()
  @HideField()
  password_recovery_token_expiration?: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Role, (role) => role.users, {
    eager: true,
  })
  @JoinTable()
  roles: Role[];

  @OneToMany(() => Bet, (bet) => bet.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  bets: Bet[];

  isAdmin(): boolean {
    return this.roles.some((role) => role.name === 'admin');
  }
}
