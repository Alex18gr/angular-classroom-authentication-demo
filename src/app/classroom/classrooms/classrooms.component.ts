import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ClassroomService} from '../classroom.service';
import {Classroom} from '../../models/classroom.model';
import {ClassroomEditModalComponent} from '../../shared/classroom-edit-modal/classroom-edit-modal.component';
import {Subscription} from 'rxjs';
import {DeleteModalComponent} from '../../shared/delete-modal/delete-modal.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.scss']
})
export class ClassroomsComponent implements OnInit, OnDestroy {
  @ViewChild('classroomEditModal', {static: false}) classroomEditModal: ClassroomEditModalComponent;
  @ViewChild('deleteModal', {static: false}) deleteModal: DeleteModalComponent;
  classroomsList: Classroom[] = [];
  classroomDataChanged: Subscription;

  constructor(private classroomService: ClassroomService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.classroomDataChanged = this.classroomService.classroomDataChanged.subscribe((data) => {
      this.getClassrooms();
    });
    this.getClassrooms();
  }

  /**
   * get the classrooms list form the classroom service using RxJS
   */
  getClassrooms() {
    this.classroomService.getClassrooms().subscribe((data: Classroom[]) => {
      this.classroomsList = data;
    });
  }

  /**
   * opens the edit classroom modal for the optional classroom provided or for create a new classroom
   */
  openEditClassroomModal(classroom?: Classroom) {
    this.classroomEditModal.showModal(classroom);
  }

  onDataSaved() {
    this.classroomService.classroomDataChanged.next();
  }

  ngOnDestroy(): void {
    if (this.classroomDataChanged) {
      this.classroomDataChanged.unsubscribe();
    }
  }

  /**
   * opens the delete classroom modal for the provided classroom
   */
  openDeleteModal(classroom: Classroom) {
    this.deleteModal.showClassroomDeleteModal(classroom);
  }
}
