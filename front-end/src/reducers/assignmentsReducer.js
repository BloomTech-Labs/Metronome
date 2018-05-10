import {
  GET_ASSIGNMENTS,
  ADD_ASSIGNMENT,
  DELETE_ASSIGNMENT,
} from '../actions';

export default (assignments = [], action) => {
  switch (action.type) {
    case GET_ASSIGNMENTS:
      return assignments;
    case ADD_ASSIGNMENT:
      return [...assignments, action.payload];
    case DELETE_ASSIGNMENT: {
      const id = action.payload;
      return [...assignments.slice(0, id), ...assignments.slice(id + 1)];
    }
    default:
      return assignments;
  }
};
