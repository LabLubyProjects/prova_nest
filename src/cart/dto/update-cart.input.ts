import { InputType } from '@nestjs/graphql';
import { IsNumber, IsPositive } from 'class-validator';

@InputType()
export class UpdateCartInput {
  @IsNumber()
  @IsPositive()
  minCartValue: number;
}
