import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClassroomsComponent } from './classroom/classrooms/classrooms.component';
import { ClassroomsListComponent } from './classroom/classrooms-list/classrooms-list.component';
import { StudentsComponent } from './student/students/students.component';
import { ClassroomEditModalComponent } from './shared/classroom-edit-modal/classroom-edit-modal.component';
import { StudentEditModalComponent } from './shared/student-edit-modal/student-edit-modal.component';
import { StudentsListComponent } from './shared/students-list/students-list.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import { ClassroomDetailsComponent } from './classroom/classroom-details/classroom-details.component';
import { StudentDetailsComponent } from './student/student-details/student-details.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { DeleteModalComponent } from './shared/delete-modal/delete-modal.component';
import {ToastContainerComponent} from './shared/toast/toast-container/toast-container.component';
import {ToastComponent} from './shared/toast/toast/toast.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { LoginComponent } from './authentication/login/login.component';
import { MainApplicationComponent } from './home/main-application/main-application.component';
import {AuthModule, EventTypes, OidcConfigService, PublicEventsService} from "angular-auth-oidc-client";
import {configureAuth, configureAuthHttp} from "./authentication/authentication.service";
import {AuthInterceptor} from "./authentication/auth.interceptor";
import {filter} from "rxjs/operators";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [
    AppComponent,
    ClassroomsComponent,
    ClassroomsListComponent,
    StudentsComponent,
    ClassroomEditModalComponent,
    StudentEditModalComponent,
    StudentsListComponent,
    NavbarComponent,
    ClassroomDetailsComponent,
    StudentDetailsComponent,
    DeleteModalComponent,
    ToastContainerComponent,
    ToastComponent,
    LoadingSpinnerComponent,
    LoginComponent,
    MainApplicationComponent
  ],
  imports: [
    AuthModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [
    OidcConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configureAuth,
      deps: [OidcConfigService, HttpClient],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private readonly eventService: PublicEventsService) {
    this.eventService
      .registerForEvents()
      .pipe(filter((notification) => notification.type === EventTypes.ConfigLoaded))
      .subscribe((config) => {
        console.log('ConfigLoaded', config);
      });
  }
}

