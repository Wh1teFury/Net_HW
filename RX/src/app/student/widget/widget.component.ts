import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AddItemAction, DeleteItemAction, EditItemAction } from 'src/app/actions/student.actions';
import { Student } from 'src/app/model/student.model';
import { StudentState } from 'src/app/reducers/student/student.reducer';
import { studentListSelector } from 'src/app/selectors/student.selectors';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.less']
})
export class WidgetComponent {

  studentList$: Observable<Student[]>;

  constructor(private store$: Store<StudentState>) {
    this.studentList$ = this.store$.pipe(select(studentListSelector))
  }

  addStudent(newStudent: Student) {
    this.store$.dispatch(AddItemAction(newStudent))
  }

  onDelete(id: string | undefined) {
    this.store$.dispatch(DeleteItemAction({ id }))
  }
  onEdit(student: Student, id: string | undefined) {
    this.store$.dispatch(EditItemAction({ student, id }))
  }
}
