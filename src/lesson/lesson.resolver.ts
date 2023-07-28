/* eslint-disable prettier/prettier */
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { LessonInput } from './leson.input';
import { assignStudentstoLessonInput } from './assignstudetnstolesson.input';
import { Lesson } from './lesson.entity';
import { StudentService } from 'src/student/student.service';

@Resolver(() => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ) {}
  @Query(() => LessonType)
  lesson(@Args('id') id: string) {
    return this.lessonService.getLesson(id);
  }

  @Query(() => [LessonType])
  lessons() {
    return this.lessonService.getLessons();
  }

  @Mutation(() => LessonType)
  createLesson(@Args('lessonInput') lessonInput: LessonInput) {
    return this.lessonService.createLesson(lessonInput);
  }

  @Mutation(() => LessonType)
  assignStudentstoLesson(
    @Args('assignStudentstoLesson')
    assignStudentstoLesson: assignStudentstoLessonInput,
  ) {
    const { lessonId, studentsId } = assignStudentstoLesson;
    return this.lessonService.assignStudentsToLesson(lessonId, studentsId);
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    return this.studentService.getStudnetsinLesson(lesson.students);
  }
}
