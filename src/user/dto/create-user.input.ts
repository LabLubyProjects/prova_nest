import { InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @MinLength(3, { message: 'Name minimum length is 3' })
  @MaxLength(50, { message: 'Name maximum length is 50' })
  //eslint-disable-next-line
  @Matches('^[a-zA-ZÀ-ÿ\s\u00f1\u00d1]*$')
  name: string;

  @IsString()
  //eslint-disable-next-line
  @Matches('^\d{3}.\d{3}.\d{3}-\d{2}$')
  cpf: string;

  @IsEmail()
  @MinLength(5, { message: 'Email minimum length is 5' })
  @MaxLength(50, { message: 'Email maximum length is 50' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password minimum length is 6' })
  @MaxLength(30, { message: 'Password maximum length is 30' })
  password: string;
}
