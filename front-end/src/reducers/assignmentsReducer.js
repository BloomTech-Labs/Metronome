import {
  GET_ASSIGNMENTS_REQUEST,
  GET_ASSIGNMENTS_SUCCESS,
  GET_ASSIGNMENTS_FAILURE,
  ADD_ASSIGNMENT_REQUEST,
  ADD_ASSIGNMENT_SUCCESS,
  ADD_ASSIGNMENT_FAILURE,
  DELETE_ASSIGNMENT_REQUEST,
  DELETE_ASSIGNMENT_SUCCESS,
  DELETE_ASSIGNMENT_FAILURE,
} from '../actions';

const initialState = {
  assignments: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ASSIGNMENTS_REQUEST:
    case ADD_ASSIGNMENT_REQUEST:
    case DELETE_ASSIGNMENT_REQUEST:
      return { ...state, isPending: true };
    case GET_ASSIGNMENTS_SUCCESS:
      return { ...state, isPending: false, assignments: action.payload };
    case GET_ASSIGNMENTS_FAILURE:
    case ADD_ASSIGNMENT_FAILURE:
    case DELETE_ASSIGNMENT_FAILURE:
      return { ...state, isPending: false, error: action.error };
    case ADD_ASSIGNMENT_SUCCESS:
      return { ...state, isPending: false, assignments: [action.payload].concat(state.assignments) };
    case DELETE_ASSIGNMENT_SUCCESS: {
      const { id } = action;
      return {
        ...state,
        isPending: false,
        assignments: state.assignments.filter(assignment => assignment._id !== id),
      };
    }
    default:
      return state;
  }
};
