import { createFeatureSelector, createSelector } from "@ngrx/store";
import { studentNode, StudentState } from "../reducers/student/student.reducer";

export const selectStudentFeature = createFeatureSelector<StudentState>(studentNode);

export const studentListSelector = createSelector(selectStudentFeature, state => state.studentList)
