import { combineReducers } from 'redux';
import assignments from './assignmentsReducer';
import { reducer as FormReducer } from 'redux-form';
import AuthReducer from './auth';
import assignmentsReducer from './assignmentsReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  form: FormReducer,
  assignments,

});

export default rootReducer;
