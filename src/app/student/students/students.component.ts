import { Component, OnInit } from '@angular/core';
import {Student} from '../../models/student.model';
import {StudentService} from '../student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  studentsList: Student[];

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.getStudentsData();
  }

  getStudentsData() {
    this.studentService.getAllStudents().subscribe((data: Student[]) => {
      this.studentsList = data;
    });
  }

  // onDataSaved() {
  //   this.getStudentsData();
  // }
}
