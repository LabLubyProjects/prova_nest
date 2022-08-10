import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GenericMessage {
  message: string;
}
