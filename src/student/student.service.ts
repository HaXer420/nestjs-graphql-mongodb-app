import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MongoRepository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Student } from './student.entity';
import { studentInput } from './student.input';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRespository: MongoRepository<Student>,
  ) {}

  async getStudent(id: string): Promise<Student> {
    return this.studentRespository.findOne({ where: { id } });
  }

  async getStudents(): Promise<Student[]> {
    return this.studentRespository.find();
  }

  async createStudent(studentInput: studentInput): Promise<Student> {
    const { firstname, lastname } = studentInput;
    const lesson = this.studentRespository.create({
      id: uuid(),
      firstname,
      lastname,
    });

    return this.studentRespository.save(lesson);
  }

  async getStudnetsinLesson(studentIds: string[]): Promise<Student[]> {
    return this.studentRespository.find({ where: { id: { $in: studentIds } } });
  }
}
