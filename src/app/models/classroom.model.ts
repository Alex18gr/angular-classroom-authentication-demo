import {Student} from './student.model';

/**
 * the Classroom entity based on the proved model
 */
export class Classroom {
  public id: number;
  public name: string;
  public students: Student[];


  constructor(id?: number, name?: string, students?: Student[]) {
    this.id = id || null;
    this.name = name || '';
    this.students = students || [];
  }
}
