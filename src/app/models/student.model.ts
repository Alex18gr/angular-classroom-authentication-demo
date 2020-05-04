import {Classroom} from './classroom.model';


/**
 * the Student entity based on the proved model
 */
export class Student {
  public id: number;
  public firstName: string;
  public lastName: string;
  public grade: number;
  public birthDate: Date;
  public classroom: Classroom;

  constructor(id?: number, firstName?: string, lastName?: string, grade?: number, birthDate?: Date, classroom?: Classroom) {
    this.id = id || null;
    this.firstName = firstName || '';
    this.lastName = lastName || '';
    this.grade = grade || null;
    this.birthDate = birthDate || null;
    this.classroom = classroom || null;
  }
}
