import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import AuthReducer from './auth';
import AssignmentsReducer from './assignmentsReducer';
import AssignmentByIdReducer from './assignmentByIdReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  form: FormReducer,
  assignments: AssignmentsReducer,
  assignment: AssignmentByIdReducer,
});

export default rootReducer;
