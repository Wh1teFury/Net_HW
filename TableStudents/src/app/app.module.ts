import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { AddStudentComponent } from "./add-student/add-student.component";
import { SettingTableComponent } from "./setting-table/setting-table.component";

@NgModule({
  declarations: [
    AddStudentComponent,
    AppComponent,
    SettingTableComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
