import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Student} from '../models/student.model';
import {Classroom} from '../models/classroom.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient) { }

  private apiUrl = environment.apiUrl;

  saveStudent(classroom: Classroom, student: Student) {
    const url = this.apiUrl + 'classrooms/' + classroom.id + '/students';
    return this.httpClient.post<Student>(url, student);
  }

  updateStudent(classroom: Classroom, student: Student) {
    const url = this.apiUrl + 'classrooms/' + classroom.id + '/students/' + student.id;
    return this.httpClient.put<Student>(url, student);
  }

  deleteStudent(classroom: Classroom, student: Student) {
    const url = this.apiUrl + 'classrooms/' + classroom.id + '/students/' + student.id;
    return this.httpClient.delete<Student>(url);
  }

  getAllStudents() {
    const url = this.apiUrl + 'students';
    return this.httpClient.get<Student[]>(url);
  }

  getStudent(studentId: number) {
    const url = `${this.apiUrl}students/${studentId}`;
    return this.httpClient.get<Student>(url);
  }

  getStudentClassroom(studentId: number) {
    const url = this.apiUrl + `students/${studentId}/classroom`;
    return this.httpClient.get<Classroom>(url);
  }
}
