import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Classroom} from '../../models/classroom.model';
import {ClassroomService} from '../../classroom/classroom.service';
import {NotificationTypes, Toast, ToastActions} from '../toast/toast.model';
import {ToastService} from '../toast/toast.service';

// This var symbol helps for using jQuery code in Typescript
declare var $: any;

@Component({
  selector: 'app-classroom-edit-modal',
  templateUrl: './classroom-edit-modal.component.html',
  styleUrls: ['./classroom-edit-modal.component.scss']
})
export class ClassroomEditModalComponent implements OnInit {
  @ViewChild('modal', {static: false}) editModal: ElementRef;
  @Output() editFormSubmitted = new EventEmitter<Classroom>();
  classroomForm: FormGroup;
  savingData = false;
  editMode = false;
  currentClassroom: Classroom;
  title = '';

  constructor(private classroomService: ClassroomService,
              private toastService: ToastService) { }

  ngOnInit() {
    this.initForm();

  }

  /**
   * initialize the edit classroom form besed on the optional provided classroom or for a new classroom
   */
  initForm(classroom?: Classroom) {
    this.classroomForm = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ])
    });
    if (classroom) {
      this.currentClassroom = classroom;
      this.classroomForm.setValue({
        name: classroom.name
      });
    } else {
      this.currentClassroom = new Classroom(0);
    }
  }

  /**
   * show the bootstrap modal using jQuery code and initialize the edit form
   */
  showModal(classroom?: Classroom) {
    $(this.editModal.nativeElement).modal();
    if (classroom) {
      this.title = 'Edit Classroom';
      this.editMode = true;
    } else {
      this.title = 'Create new Classroom';
      this.editMode = false;
    }
    this.initForm(classroom);
  }

  /**
   * hides the modal and reset the modal component variables
   */
  hideModal() {
    this.currentClassroom = null;
    this.savingData = false;
    this.title = '';
    this.editMode = false;
    $(this.editModal.nativeElement).modal('hide');
  }

  onSaveChanges() {
    this.currentClassroom.name = this.classroomForm.getRawValue().name;
    this.savingData = true;
    if (this.editMode) {
      this.updateClassroom();
    } else {
      this.saveClassroom();
    }
  }

  /**
   * saves the editing classroom. Also used the toast service to provide feedback about the operation
   */
  saveClassroom() {
    this.classroomService.saveClassroom(this.currentClassroom).subscribe((data: Classroom) => {
        this.editFormSubmitted.emit(data);
        console.log(data);
        this.hideModal();
        this.toastService.addToast(new Toast({
          title: 'Classroom Saved Successfully',
          message: `Classroom ${data.name} saved successfully.`,
          notificationType: NotificationTypes.info,
          action: ToastActions.created
        }));
      },
      (error => {
        this.savingData = false;
        this.toastService.addToast(new Toast({
          title: 'Classroom Saved Successfully',
          message: `An error occurred while updating classroom.`,
          notificationType: NotificationTypes.danger,
          action: ToastActions.failed
        }));
      }));
  }

  private updateClassroom() {
    this.classroomService.updateClassroom(this.currentClassroom).subscribe((data: Classroom) => {
      this.editFormSubmitted.emit(data);
      this.hideModal();
      this.toastService.addToast(new Toast({
        title: 'Classroom Updated Successfully',
        message: `Classroom ${data.name} updated successfully.`,
        notificationType: NotificationTypes.info,
        action: ToastActions.updated
      }));
    }, error => {
      this.savingData = false;
      this.toastService.addToast(new Toast({
        title: 'Classroom Update Failed',
        message: `An error occurred while updating classroom ${this.currentClassroom.name}.`,
        notificationType: NotificationTypes.danger,
        action: ToastActions.failed
      }));
    });
  }

  formTouchedCondition(control: AbstractControl) {
    return control.invalid && (control.dirty || control.touched);
  }

  isInvalidControlCondition(control: AbstractControl) {
    return control.invalid && this.formTouchedCondition(control);
  }
}
