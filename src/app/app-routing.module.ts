import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClassroomsComponent} from './classroom/classrooms/classrooms.component';
import {StudentsComponent} from './student/students/students.component';
import {ClassroomDetailsComponent} from './classroom/classroom-details/classroom-details.component';
import {StudentDetailsComponent} from './student/student-details/student-details.component';

const routes: Routes = [
  {path: '', redirectTo: '/classrooms', pathMatch: 'full'},
  {path: 'classrooms', component: ClassroomsComponent, children: [
      {path: ':cid', component: ClassroomDetailsComponent}
    ]},
  {path: 'students', component: StudentsComponent},
  {path: 'students/:sid', component: StudentDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
