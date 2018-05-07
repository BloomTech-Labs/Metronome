import { combineReducers } from 'redux';
<<<<<<< HEAD
import assignments from './assignmentsReducer';

const rootReducer = combineReducers({
  assignments,
=======
import { reducer as FormReducer } from 'redux-form';
import AuthReducer from './auth';

const rootReducer = combineReducers({
  auth: AuthReducer,
  form: FormReducer,
>>>>>>> master
});

export default rootReducer;
