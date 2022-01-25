import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Student } from 'src/app/model/student.model';

@Component({
  selector: 'app-ui-student-add',
  templateUrl: './ui-student-add.component.html',
  styleUrls: ['./ui-student-add.component.less']
})
export class UiStudentAddComponent implements OnInit {

  @Input()
  students!: Student;

  @Output()
  delete = new EventEmitter<string | undefined>();

  constructor() { }

  ngOnInit(): void {
  }

  onDelete() {
    this.delete.emit();
  }

}
