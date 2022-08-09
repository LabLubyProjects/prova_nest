import { InputType } from '@nestjs/graphql';
import { ArrayMinSize, IsArray } from 'class-validator';

@InputType()
export class CreateBetInput {
  @IsArray()
  @ArrayMinSize(1, { message: 'You need to provide at least one bet' })
  bets: any[];
}
