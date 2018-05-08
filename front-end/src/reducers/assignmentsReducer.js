import {
  GET_ASSIGNMENTS,
  ADD_ASSIGNMENT,
  DELETE_ASSIGNMENT,
  VIEW_ASSIGNMENT_DETAILS,
} from '../actions';

export default (assignments = [], action) => {
  switch (action.type) {
    case GET_ASSIGNMENTS:
      return assignments;
    case ADD_ASSIGNMENT:
      return [...assignments, action.payload];
    case DELETE_ASSIGNMENT: {
      const { assignmentID } = action.payload;
      return assignments.filter(assignment => assignment.id !== assignmentID);
    }
    case VIEW_ASSIGNMENT_DETAILS: {
      const { assignmentID } = action.payload;
      return assignments.filter(assignment => assignment.id === assignmentID);
    }
    default:
      return assignments;
  }
};
