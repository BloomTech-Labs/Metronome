import axios from 'axios';

axios.defaults.withCredentials = true;
const ROOT_URL = '/api/user';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export const GET_ASSIGNMENTS = 'GET_ASSIGNMENTS';
export const DELETE_ASSIGNMENT = 'DELETE_ASSIGNMENT';
export const ADD_ASSIGNMENT = 'ADD_ASSIGNMENT';
export const VIEW_ASSIGNMENT_DETAILS = 'VIEW_ASSIGNMENT_DETAILS';

export const login = (email, password, history) => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  axios
    .post(`${ROOT_URL}/login`, { email, password })
    .then((response) => {
      window.localStorage.setItem('token', JSON.stringify(response.data.token));
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      history.push('/');
    })
    .then()
    .catch((error) => {
      dispatch({ type: LOGIN_FAILURE, error: error.response.data });
    });
};

export const register = (
  email,
  password,
  firstName,
  lastName,
  role,
  history,
) => (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  axios
    .post(`${ROOT_URL}/register`, {
      email,
      password,
      firstName,
      lastName,
      role,
    })
    .then((response) => {
      dispatch({ type: REGISTER_SUCCESS, payload: response.data });
      history.push('/login');
    })
    .catch((error) => {
      dispatch({ type: REGISTER_FAILURE, error: error.response.data });
    });
};

export const getAssignments = () => ({
  type: 'GET_ASSIGNMENTS',
});

export const addAssignment = assignment => ({
  type: 'ADD_ASSIGNMENT',
  payload: assignment,
});

export const deleteAssignment = index => ({
  type: 'DELETE_ASSIGNMENT',
  payload: index,
});

export const viewAssignmentDetails = id => ({
  type: 'VIEW_ASSIGNMENT_DETAILS',
  payload: id,
});

export const logout = history => (dispatch) => {
  try {
    dispatch({ type: LOGOUT_REQUEST });
    window.localStorage.removeItem('token');
    dispatch({ type: LOGOUT_SUCCESS });
    history.push('/');
  } catch (error) {
    dispatch({ type: LOGOUT_FAILURE, error: error.response.data });
  }
};
