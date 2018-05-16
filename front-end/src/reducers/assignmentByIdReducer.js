import { GET_ASSIGNMENT_BY_ID_REQUEST, GET_ASSIGNMENT_BY_ID_SUCCESS, GET_ASSIGNMENT_BY_ID_FAILURE } from '../actions';

const initialState = {
  assignment: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ASSIGNMENT_BY_ID_REQUEST:
      return { ...state, isPending: true };
    case GET_ASSIGNMENT_BY_ID_SUCCESS:
      return { ...state, isPending: false, assignment: action.payload, errors: null };
    case GET_ASSIGNMENT_BY_ID_FAILURE:
      return { ...state, isPending: false, errors: action.errors };
    default:
      return state;
  }
};
