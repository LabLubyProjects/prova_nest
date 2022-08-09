import { InputType } from '@nestjs/graphql';
import {
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateGameInput {
  @IsString()
  @MinLength(3, { message: 'Type minimum length is 3' })
  @MaxLength(50, { message: 'Type maximum length is 3' })
  //eslint-disable-next-line
  @Matches('^[a-zA-ZÀ-ÿ\s\u00f1\u00d1-]*$')
  type: string;

  @IsString()
  @MinLength(10, { message: 'Type minimum length is 10' })
  @MaxLength(255, { message: 'Type maximum length is 255' })
  description: string;

  @IsNumber()
  @IsPositive({ message: 'Range must be positive' })
  range: number;

  @IsNumber()
  @IsPositive({ message: 'Price must be positive' })
  price: number;

  @IsInt()
  @IsPositive({ message: 'MinAndMaxNumber must be positive' })
  minAndMaxNumber: number;

  @IsString()
  color: string;
}
