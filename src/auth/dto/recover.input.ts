import { InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class RecoverInput {
  @IsEmail()
  email: string;
}
