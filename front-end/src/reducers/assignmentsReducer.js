import {
  GET_ASSIGNMENTS,
  ADD_ASSIGNMENT,
  DELETE_ASSIGNMENT,
  GET_STUDENT_ASSIGNMENT,
} from '../actions';

const initialState = [{ assignmentName: 'Hallelujah', daysToPractice: ['Monday', 'Tuesday'], musicFile: 'test.pdf', hoursToPractice: 3, dueDate: '10/10/20' }];

export default (assignments = initialState, action) => {
  switch (action.type) {
    case GET_ASSIGNMENTS:
      return assignments;
    case ADD_ASSIGNMENT:
      return [...assignments, action.payload];
    case DELETE_ASSIGNMENT: {
      const id = action.payload;
      return [...assignments.slice(0, id), ...assignments.slice(id + 1)];
    }
    case GET_STUDENT_ASSIGNMENT: {
      console.log(`Get student assignment ${action.payload}`);
      const id = action.payload;
      return assignments.slice(id, id + 1);
    }
    default:
      return assignments;
  }
};
