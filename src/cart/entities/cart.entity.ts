import { ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Cart {
  @PrimaryColumn()
  min_cart_value: number;
}
