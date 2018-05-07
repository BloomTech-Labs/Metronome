import { combineReducers } from 'redux';
import assignments from './assignmentsReducer';

const rootReducer = combineReducers({
  assignments,
});

export default rootReducer;
