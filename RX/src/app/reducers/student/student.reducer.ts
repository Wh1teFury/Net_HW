import { createReducer, on } from "@ngrx/store";
import { AddItemAction, DeleteItemAction, EditItemAction } from "src/app/actions/student.actions";
import { Student } from "src/app/model/student.model";
import { v4 as uuid } from 'uuid';

export const studentNode = 'student';

export interface StudentState {
  studentList: Student[];
}

const initialState: StudentState = {
  studentList: []
}

export const studentReducer = createReducer(initialState,
  on(AddItemAction, (state, action) => ({
    ...state, studentList: [...state.studentList, {
      id: uuid(),
      name: action.name,
      surname: action.surname,
    }]
  })),
  on(DeleteItemAction, (state, action) => ({ ...state, studentList: state.studentList.filter(student => student.id !== action.id) })),
  on(EditItemAction, (state, action) => ({
    ...state, studentList: state.studentList.map(student => student.id === action.id ? {
      ...student,
      name: action.student.name,
      surname: action.student.surname
    } : student)
  }))
);
