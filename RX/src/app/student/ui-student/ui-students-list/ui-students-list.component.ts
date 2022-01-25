import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from 'src/app/model/student.model';


@Component({
  selector: 'app-ui-students-list',
  templateUrl: './ui-students-list.component.html',
  styleUrls: ['./ui-students-list.component.less']
})
export class UiStudentsListComponent {
  @Input()
  studentList: Student[] | null = [];

  @Output()
  delete = new EventEmitter<string | undefined>();

  @Output()
  edit = new EventEmitter<{ student: Student; id: string | undefined }>();

  constructor() { }

  onDelete(id: string | undefined) {
    this.delete.emit(id);
  }
  onEdit(student: Student, id: string | undefined) {
    this.edit.emit({ student, id })
  }

}
