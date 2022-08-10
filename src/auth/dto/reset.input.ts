import { InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class ResetInput {
  @IsEmail()
  email: string;

  token: string;

  @IsString()
  @MinLength(6, { message: 'Password minimum length is 6' })
  @MaxLength(30, { message: 'Password maximum length is 30' })
  newPassword: string;
}
