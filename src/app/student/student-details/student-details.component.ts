import { Component, OnInit } from '@angular/core';
import {forkJoin, Subscription} from 'rxjs';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ClassroomService} from '../../classroom/classroom.service';
import {StudentService} from '../student.service';
import {Classroom} from '../../models/classroom.model';
import {Student} from '../../models/student.model';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {
  currentStudent: Student;
  currentStudentClassroom: Classroom;
  dataLoaded = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private studentService: StudentService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.getStudentData(parseInt(params.get('sid'), 10));
    });
  }

  private getStudentData(studentId: number) {
    this.dataLoaded = false;
    forkJoin([
      this.studentService.getStudent(studentId),
      this.studentService.getStudentClassroom(studentId)
    ]).subscribe((data: [Student, Classroom]) => {
      this.currentStudent = data[0];
      this.currentStudentClassroom = data [1];
      this.dataLoaded = true;
    });
  }
}
