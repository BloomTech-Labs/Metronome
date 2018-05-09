import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import AuthReducer from './auth';
import AssignmentsReducer from './assignmentsReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  form: FormReducer,
  assignments: AssignmentsReducer,
});

export default rootReducer;
