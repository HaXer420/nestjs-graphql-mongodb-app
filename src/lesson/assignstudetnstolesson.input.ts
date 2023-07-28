/* eslint-disable prettier/prettier */
import { InputType, Field, ID } from '@nestjs/graphql';
import { MinLength, IsDateString, IsUUID } from 'class-validator';
import { type } from 'os';

@InputType()
export class assignStudentstoLessonInput {
  @IsUUID()
  @Field((type) => ID)
  lessonId: string;

  @IsUUID('4', { each: true })
  @Field((type) => [ID])
  studentsId: string[];
}
