import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { StudentComponent } from './student/student.component';
import { RouterModule } from '@angular/router';
import { WidgetComponent } from './student/widget/widget.component';
import { UiStudentComponent } from './student/ui-student/ui-student.component';
import { UiStudentsListComponent } from './student/ui-student/ui-students-list/ui-students-list.component';
import { UiStudentEditComponent } from './student/ui-student/ui-student-edit/ui-student-edit.component';
import { UiStudentAddComponent } from './student/ui-student/ui-student-add/ui-student-add.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    WidgetComponent,
    UiStudentComponent,
    UiStudentsListComponent,
    UiStudentEditComponent,
    UiStudentAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: "",
        component: StudentComponent
      },
      {
        path: "**",
        redirectTo: ""
      }
    ]),
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
