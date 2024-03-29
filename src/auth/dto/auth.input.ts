import { InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class AuthInput {
  @IsEmail()
  email: string;

  password: string;
}
