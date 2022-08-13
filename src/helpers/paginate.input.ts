import { InputType } from '@nestjs/graphql';
import { IsInt, IsOptional } from 'class-validator';

@InputType()
export class PaginateInput {
  @IsInt()
  @IsOptional()
  page: number;

  @IsInt()
  @IsOptional()
  perPage: number;
}
