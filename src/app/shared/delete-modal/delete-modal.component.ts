import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Classroom} from '../../models/classroom.model';
import {ClassroomService} from '../../classroom/classroom.service';
import {Student} from '../../models/student.model';
import {StudentService} from '../../student/student.service';
import {ToastService} from '../toast/toast.service';
import {NotificationTypes, Toast, ToastActions} from '../toast/toast.model';

declare var $: any;

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {
  @ViewChild('modal', {static: false}) deleteModal: ElementRef;
  @Output() editFormSubmitted = new EventEmitter<Classroom>();
  deletingData = false;
  deleteClassroomMode = false;
  deletingComponent: Classroom | Student;
  currentClassroom: Classroom;
  title = '';
  message = '';
  Student = Student;
  Classroom = Classroom;

  constructor(private classroomService: ClassroomService,
              private studentService: StudentService,
              private toastService: ToastService) { }

  ngOnInit() {
  }

  /**
   * show the bootstrap modal using jQuery code for deleting the provided classroom
   */
  showClassroomDeleteModal(component: Classroom) {
    this.deletingComponent = component;
    this.deleteClassroomMode = true;
    this.title = 'Delete Classroom ' + this.deletingComponent.name;
    this.message = 'Are you sure you want to delete classroom ' + this.deletingComponent.name + '?';
    $(this.deleteModal.nativeElement).modal();
  }

  /**
   * show the bootstrap modal using jQuery code for deleting the provided student
   */
  showStudentDeleteModal(component: Student, currentClassroom: Classroom) {
    this.deletingComponent = component;
    this.deleteClassroomMode = false;
    this.currentClassroom = currentClassroom;
    this.title = 'Delete Student ' + this.deletingComponent.firstName + ' ' + this.deletingComponent.lastName;
    this.message = 'Are you sure you want to delete student ' + this.deletingComponent.firstName + ' '
      + this.deletingComponent.lastName + '?';
    $(this.deleteModal.nativeElement).modal();
  }

  /**
   * hides the modal using jQuery code and reset the modal component values
   */
  hideModal() {
    this.deletingComponent = null;
    this.currentClassroom = null;
    this.title = '';
    this.message = '';
    $(this.deleteModal.nativeElement).modal('hide');
  }

  onDelete() {
    if (this.deleteClassroomMode) {
      this.deleteClassroom();
    } else {
      this.deleteStudent();
    }
  }

  private deleteClassroom() {
    this.deletingData = true;
    this.classroomService.deleteClassroom(this.deletingComponent as Classroom)
      .subscribe(() => {
        this.deletingData = false;
        this.toastService.addToast(new Toast({
          title: 'Classroom Deleted Successfully',
          message: `Classroom ${(this.deletingComponent as Classroom).name} deleted successfully.`,
          notificationType: NotificationTypes.info,
          action: ToastActions.deleted
        }));
        this.editFormSubmitted.emit();
        this.hideModal();
      },
      error => {
        this.deletingData = false;
        this.toastService.addToast(new Toast({
          title: 'Classroom Delete Failed',
          message: `An error occurred while trying to delete classroom ${(this.deletingComponent as Classroom).name}.`,
          notificationType: NotificationTypes.danger,
          action: ToastActions.failed
        }));
      });
  }

  private deleteStudent() {
    this.deletingData = true;
    this.studentService.deleteStudent(this.currentClassroom, this.deletingComponent as Student)
      .subscribe(() => {
        this.deletingData = false;
        this.toastService.addToast(new Toast({
          title: 'Student Deleted Successfully',
          message: `Student ${(this.deletingComponent as Student).firstName} ${(this.deletingComponent as Student).lastName}` +
           `deleted successfully from classroom ${this.currentClassroom.name}.`,
          notificationType: NotificationTypes.info,
          action: ToastActions.deleted
        }));
        this.editFormSubmitted.emit();
        this.hideModal();
      }, error => {
        this.deletingData = false;
        this.toastService.addToast(new Toast({
          title: 'Student Delete Failed',
          message: `An error occurred while trying to delete student ${(this.deletingComponent as Student).firstName} ` +
          `${(this.deletingComponent as Student).lastName}.`,
          notificationType: NotificationTypes.danger,
          action: ToastActions.failed
        }));
      });
  }
}
