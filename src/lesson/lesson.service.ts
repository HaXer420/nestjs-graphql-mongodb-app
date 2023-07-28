/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';
import { Lesson } from './lesson.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { LessonInput } from './leson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRespository: Repository<Lesson>,
  ) {}

  async getLesson(id: string): Promise<Lesson> {
    return this.lessonRespository.findOne({ where: { id } });
  }

  async getLessons(): Promise<Lesson[]> {
    return this.lessonRespository.find();
  }

  async createLesson(lessonInput: LessonInput): Promise<Lesson> {
    const { name, startDate, endDate, students } = lessonInput;
    const lesson = this.lessonRespository.create({
      id: uuid(),
      name,
      startDate,
      endDate,
      students,
    });

    return this.lessonRespository.save(lesson);
  }

  async assignStudentsToLesson(
    lessonId: string,
    studentsId: string[],
  ): Promise<Lesson> {
    const lesson = await this.lessonRespository.findOne({
      where: { id: lessonId },
    });
    lesson.students.push(...studentsId);
    return await this.lessonRespository.save(lesson);
  }
}
