import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AddItemAction } from '../actions/student.actions';
import { Student } from '../model/student.model';
import { StudentState } from '../reducers/student/student.reducer';
import { studentListSelector } from '../selectors/student.selectors';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.less']
})
export class StudentComponent { }
