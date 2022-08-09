import { ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity()
export class Cart {
  @Column()
  min_cart_value: number;
}
