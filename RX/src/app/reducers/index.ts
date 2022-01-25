import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { studentNode, studentReducer, StudentState } from './student/student.reducer';

export interface State {
  [studentNode]: StudentState
}

export const reducers: ActionReducerMap<State> = {
  [studentNode]: studentReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
