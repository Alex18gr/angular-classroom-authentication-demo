import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Classroom} from '../models/classroom.model';
import {Subject} from 'rxjs';
import {environment} from '../../environments/environment';

/**
 * This service is responsible for the communication with the API and the CRUD operations for the Classrooms
 * RxJS is used also
 */
@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  // it is used to inform about data changes
  classroomDataChanged = new Subject<any>();
  // it holds the selected classroom. It is used by the classrooms list component
  selectedClassroom: Classroom;

  // the HttpClient is used to communicate through http requests with the API
  constructor(private httpClient: HttpClient) { }

  // the base url of the api
  private apiUrl = environment.apiUrl;

  /**
   * get all the classrooms
   */
  getClassrooms() {
    const url = this.apiUrl + 'classrooms';
    return this.httpClient.get<Classroom[]>(url);
  }

  /**
   * get a classroom based on the given classroom id
   */
  getClassroom(classroomId: number) {
    const url = this.apiUrl + 'classrooms/' + classroomId;
    return this.httpClient.get<Classroom>(url);
  }

  /**
   * save a given classroom with POST http request
   */
  saveClassroom(classroom: Classroom) {
    const url = this.apiUrl + 'classrooms';
    return this.httpClient.post<Classroom>(url, classroom);
  }

  /**
   * update a given classroom with PUT http request to the API
   */
  updateClassroom(classroom: Classroom) {
    const url = this.apiUrl + 'classrooms/' + classroom.id;
    return this.httpClient.put<Classroom>(url, classroom);
  }

  /**
   * deletes a given classroom using DELETE http request to the API
   */
  deleteClassroom(classroom: Classroom) {
    const url = this.apiUrl + 'classrooms/' + classroom.id;
    return this.httpClient.delete<Classroom>(url);
  }
}
