import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Student } from 'src/app/model/student.model';

@Component({
  selector: 'app-ui-student-edit',
  templateUrl: './ui-student-edit.component.html',
  styleUrls: ['./ui-student-edit.component.less']
})
export class UiStudentEditComponent implements OnInit {

  @Input()
  students!: Student;

  @Output()
  edit = new EventEmitter<{ name: string; surname: string }>();

  public newName: string = '';
  public newSurname: string = '';
  public newStudent: Student = {
    name: '',
    surname: '',
  }

  constructor() { }

  ngOnInit(): void {
    this.newName = this.students.name;
    this.newSurname = this.students.surname;
  }

  onEdit() {
    if (this.newName != "" && this.newSurname != "") {
      this.edit.emit({
        name: this.newName,
        surname: this.newSurname,
      });
      this.newName = "";
      this.newSurname = "";
    }
  }
}
