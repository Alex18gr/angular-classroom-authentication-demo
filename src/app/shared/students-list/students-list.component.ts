import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Student} from '../../models/student.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {
  @Input() students: Student[];
  @Output() editSelected = new EventEmitter<Student>();
  @Output() deleteSelected = new EventEmitter<Student>();
  @Input() actionsEnabled = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onStudentSelected(student: Student) {
    this.router.navigate(['students', student.id]);
  }
}
