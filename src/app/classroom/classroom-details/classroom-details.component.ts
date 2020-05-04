import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ClassroomService} from '../classroom.service';
import {Classroom} from '../../models/classroom.model';
import {StudentEditModalComponent} from '../../shared/student-edit-modal/student-edit-modal.component';
import {Student} from '../../models/student.model';
import {DeleteModalComponent} from '../../shared/delete-modal/delete-modal.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-classroom-details',
  templateUrl: './classroom-details.component.html',
  styleUrls: ['./classroom-details.component.scss']
})
export class ClassroomDetailsComponent implements OnInit, OnDestroy {
  // the 2 modals for editing and deleting students
  @ViewChild('studentEditModal', {static: false}) studentEditModal: StudentEditModalComponent;
  @ViewChild('deleteModal', {static: false}) deleteModal: DeleteModalComponent;
  // the current classroom received from the classroom service
  classroom: Classroom;
  // the subscription is saved because it needs to be unsubscribed on destroy
  classroomDataChangedSubscription: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private classroomService: ClassroomService) { }

  ngOnInit() {
    // get the classroom id from the url params check it and get the classroom form the classroomService
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (isNaN(+params.get('cid'))) { // if classroom id is not a valid number, it redirects to classrooms list page
        this.router.navigate(['classrooms']);
      } else {
        this.classroomDataChangedSubscription = this.classroomService.classroomDataChanged
          .subscribe(() => {
            this.getClassroomData(parseInt(params.get('cid'), 10));
          });
        this.getClassroomData(parseInt(params.get('cid'), 10));
      }
    });
  }

  /**
   * get classroom data using the classroom service and RxJS based on the given id
   */
  private getClassroomData(classroomId: number) {
    this.classroomService.getClassroom(classroomId).subscribe((data: Classroom) => {
      this.classroom = data;
      this.classroomService.selectedClassroom = this.classroom;
    }, error => {
      console.log(error);
      if (error.status === 404) { // if the classroom is not found it directs back to classrooms list page
        this.router.navigate(['classrooms']);
      }
    });
  }

  /**
   * open the edit student modal for the optional provided student for editing him and
   * empty params for craeting new student for the provided classroom
   */
  openEditStudentModal(student?: Student) {
    this.studentEditModal.showModal(this.classroom, student);
  }

  /**
   * informs the classroom service that the data is changed after a successful data save
   */
  onDataSaved() {
    this.classroomService.classroomDataChanged.next();
  }

  /**
   * opens the delete student modal for the given student
   */
  openDeleteModal(student: Student) {
    this.deleteModal.showStudentDeleteModal(student, this.classroom);
  }

  ngOnDestroy(): void {
    if (this.classroomDataChangedSubscription) {
      this.classroomDataChangedSubscription.unsubscribe();
    }
  }
}
