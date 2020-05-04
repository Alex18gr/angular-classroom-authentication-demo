import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Classroom} from '../../models/classroom.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ClassroomService} from '../classroom.service';

@Component({
  selector: 'app-classrooms-list',
  templateUrl: './classrooms-list.component.html',
  styleUrls: ['./classrooms-list.component.scss']
})
export class ClassroomsListComponent implements OnInit {
  // the provided classrooms list
  @Input() classrooms: Classroom[];
  // these events are emitted in the template, they are for informing the parent component for the crud actions for
  // a selected classroom
  @Output() selectedClassroomChanged = new EventEmitter<Classroom>();
  @Output() editSelected = new EventEmitter<Classroom>();
  @Output() deleteSelected = new EventEmitter<Classroom>();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private classroomService: ClassroomService) { }

  ngOnInit() {
  }

  /**
   * it navigates to a provided classroom's details page
   */
  onClassroomSelect(classroom: Classroom) {
    this.router.navigate([classroom.id], {relativeTo: this.route});
  }

  /**
   * help function to find out if a provided classroom is selected. It is used for the
   * list styling of the selected classroom
   */
  isSelected(c: Classroom) {
    return this.classroomService.selectedClassroom && this.classroomService.selectedClassroom.id === c.id;
  }
}
