/* eslint-disable prettier/prettier */
import { InputType, Field } from '@nestjs/graphql';
import { MinLength, IsDateString } from 'class-validator';

@InputType()
export class studentInput {
  @MinLength(1)
  @Field()
  firstname: string;

  @MinLength(1)
  @Field()
  lastname: string;
}
