import { createAction, props } from "@ngrx/store";
import { Student } from "../model/student.model";

export const AddItemAction = createAction('[STUDENT] Add', props<{ name: string, surname: string }>());
export const DeleteItemAction = createAction('[STUDENT] Delete', props<{ id: string | undefined }>());
export const EditItemAction = createAction('[STUDENT] Edit', props<{ student: Student, id: string | undefined }>());
