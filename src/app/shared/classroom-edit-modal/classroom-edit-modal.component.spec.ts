import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomEditModalComponent } from './classroom-edit-modal.component';

describe('ClassroomEditModalComponent', () => {
  let component: ClassroomEditModalComponent;
  let fixture: ComponentFixture<ClassroomEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassroomEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
