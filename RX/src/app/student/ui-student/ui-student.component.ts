import { Component, EventEmitter, Output } from '@angular/core';
import { Student } from 'src/app/model/student.model';

@Component({
  selector: 'app-ui-student',
  templateUrl: './ui-student.component.html',
  styleUrls: ['./ui-student.component.less']
})
export class UiStudentComponent {
  public newName: string = '';
  public newSurname: string = '';
  public newStudent: Student = {
    name: '',
    surname: '',
  }
  @Output()
  create = new EventEmitter<Student>()
  addStudent() {
    if (this.newName != "" && this.newSurname != "") {
      this.create.emit(this.newStudent = {
        name: this.newName,
        surname: this.newSurname,
      });
      this.newName = "";
      this.newSurname = "";
    }
  }
}
