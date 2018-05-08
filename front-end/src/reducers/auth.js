import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from '../actions';

const initialState = {
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case UPDATE_USER_REQUEST:
    case LOGOUT_REQUEST:
      return { ...state, isPending: true };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return { ...state, isPending: false, token: action.payload };
    case LOGOUT_SUCCESS:
      return { ...state, isPending: false };
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case UPDATE_USER_FAILURE:
    case LOGOUT_FAILURE:
      return { ...state, isPending: false, error: action.error };
    default:
      return state;
  }
};
