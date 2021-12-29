import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { TableComponent } from "../TablePage/table/table.component";
import { AddStudentsComponent } from "../TablePage/add-students/add-students.component";
import { DropdownDirective, HighlightDirective } from "../TablePage/main.derective";
import { AgePipe, EmojiPipe } from "../TablePage/main.pipe";

@NgModule({
  declarations: [
    AddStudentsComponent,
    AgePipe,
    DropdownDirective,
    EmojiPipe,
    HighlightDirective,
    TableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  exports: [
    AddStudentsComponent,
    TableComponent,
  ]

})
export class TableModule { }
