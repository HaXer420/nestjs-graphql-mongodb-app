/* eslint-disable prettier/prettier */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StudentType } from './student.type';
import { StudentService } from './student.service';
import { studentInput } from './student.input';

@Resolver(() => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}
  @Query(() => StudentType)
  student(@Args('id') id: string) {
    return this.studentService.getStudent(id);
  }

  @Query(() => [StudentType])
  students() {
    return this.studentService.getStudents();
  }

  @Mutation(() => StudentType)
  createStudent(@Args('studentInput') studentInput: studentInput) {
    return this.studentService.createStudent(studentInput);
  }
}
