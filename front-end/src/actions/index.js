import axios from 'axios';
import jwtDecode from 'jwt-decode';

axios.defaults.withCredentials = true;
const AUTH_URL = '/api/user';
const TEACHER_URL = '/api/teacher';
const STUDENT_URL = '/api/student';

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

export const GET_ASSIGNMENTS_REQUEST = 'GET_ASSIGNMENTS_REQUEST';
export const GET_ASSIGNMENTS_SUCCESS = 'GET_ASSIGNMENTS_SUCCESS';
export const GET_ASSIGNMENTS_FAILURE = 'GET_ASSIGNMENTS_FAILURE';

export const ADD_ASSIGNMENT_REQUEST = 'ADD_ASSIGNMENT_REQUEST';
export const ADD_ASSIGNMENT_SUCCESS = 'ADD_ASSIGNMENT_SUCCESS';
export const ADD_ASSIGNMENT_FAILURE = 'ADD_ASSIGNMENT_FAILURE';

export const DELETE_ASSIGNMENT_REQUEST = 'DELETE_ASSIGNMENT_REQUEST';
export const DELETE_ASSIGNMENT_SUCCESS = 'DELETE_ASSIGNMENT_SUCCESS';
export const DELETE_ASSIGNMENT_FAILURE = 'DELETE_ASSIGNMENT_FAILURE';

export const CLAIM_ASSIGNMENT_REQUEST = 'CLAIM_ASSIGNMENT_REQUEST';
export const CLAIM_ASSIGNMENT_SUCCESS = 'CLAIM_ASSIGNMENT_SUCCESS';
export const CLAIM_ASSIGNMENT_FAILURE = 'CLAIM_ASSIGNMENT_FAILURE';

export const UPDATE_ASSIGNMENT_REQUEST = 'UPDATE_ASSIGNMENT_REQUEST';
export const UPDATE_ASSIGNMENT_SUCCESS = 'UPDATE_ASSIGNMENT_SUCCESS';
export const UPDATE_ASSIGNMENT_FAILURE = 'UPDATE_ASSIGNMENT_FAILURE';

export const GET_ASSIGNMENT_BY_ID_REQUEST = 'GET_ASSIGNMENT_BY_ID_REQUEST';
export const GET_ASSIGNMENT_BY_ID_SUCCESS = 'GET_ASSIGNMENT_BY_ID_SUCCESS';
export const GET_ASSIGNMENT_BY_ID_FAILURE = 'GET_ASSIGNMENT_BY_ID_FAILURE';

export const GET_STUDENT_LIST = 'GET_STUDENT_LIST';
export const GET_STUDENT_ASSIGNMENT = 'GET_STUDENT_ASSIGNMENT';

export const login = (email, password, history) => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  axios
    .post(`${AUTH_URL}/login`, { email, password })
    .then((response) => {
      window.localStorage.setItem('token', response.data.token);
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      history.push('/dashboard/assignments');
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
    .post(`${AUTH_URL}/register`, {
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

export const updateUser = (
  firstName,
  lastName,
  newEmail,
  oldPassword,
  newPassword,
  history,
) => (dispatch) => {
  const token = window.localStorage.getItem('token');
  dispatch({ type: UPDATE_USER_REQUEST });
  axios
    .put(
      AUTH_URL,
      { firstName, lastName, newEmail, oldPassword, newPassword },
      { headers: { Authorization: token } },
    )
    .then((response) => {
      window.localStorage.setItem('token', response.data.token);
      dispatch({ type: UPDATE_USER_SUCCESS, payload: response.data });
      history.push('/dashboard');
    })
    .catch((error) => {
      dispatch({ type: UPDATE_USER_FAILURE, error: error.response.data });
    });
};

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

export const getAssignments = () => (dispatch) => {
  const token = window.localStorage.getItem('token');
  const user = jwtDecode(token);
  const url = user.role === 'Teacher' ? TEACHER_URL : STUDENT_URL;
  dispatch({ type: GET_ASSIGNMENTS_REQUEST });
  axios.get(`${url}/assignments`, { headers: { Authorization: token } })
    .then((response) => {
      dispatch({ type: GET_ASSIGNMENTS_SUCCESS, payload: response.data.assignments });
    })
    .catch((error) => {
      dispatch({ type: GET_ASSIGNMENTS_FAILURE, error: error.response.data });
    });
};

export const addAssignment = assignment => (dispatch) => {
  const token = window.localStorage.getItem('token');
  dispatch({ type: ADD_ASSIGNMENT_REQUEST });
  axios.post(`${TEACHER_URL}/emailAssignments`, assignment, { headers: { Authorization: token } })
    .then((response) => {
      dispatch({ type: ADD_ASSIGNMENT_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: ADD_ASSIGNMENT_FAILURE, error: error.response.data });
    });
};

export const deleteAssignment = id => (dispatch) => {
  const token = window.localStorage.getItem('token');
  dispatch({ type: DELETE_ASSIGNMENT_REQUEST });
  axios.delete(`${TEACHER_URL}/assignment/${id}`, {
    headers: { Authorization: token },
  })
    .then((response) => {
      dispatch({ type: DELETE_ASSIGNMENT_SUCCESS, id });
    })
    .catch((error) => {
      dispatch({ type: DELETE_ASSIGNMENT_FAILURE, error: error.response.data });
    });
};

export const claimAssignment = assignmentToken => (dispatch) => {
  const token = window.localStorage.getItem('token');
  dispatch({ type: CLAIM_ASSIGNMENT_REQUEST });
  axios.post('/api/student/claimAssignmentToken', { assignmentToken }, { headers: { Authorization: token } })
    .then((response) => {
      dispatch({ type: CLAIM_ASSIGNMENT_SUCCESS });
      window.localStorage.removeItem('assignmentToken');
    })
    .catch((error) => {
      dispatch({ type: CLAIM_ASSIGNMENT_FAILURE, error: error.response.data });
    });
};

export const updateAssignment = (progress, assignmentId) => (dispatch) => {
  const token = window.localStorage.getItem('token');
  dispatch({ type: UPDATE_ASSIGNMENT_REQUEST });
  axios.post('/api/student/updateProgress', { progress, assignmentId }, { headers: { Authorization: token } })
    .then((response) => {
      dispatch({ type: UPDATE_ASSIGNMENT_SUCCESS });
    })
    .catch((error) => {
      dispatch({ type: UPDATE_ASSIGNMENT_FAILURE, error: error.response.data });
    });
};

export const getAssignmentById = assignmentId => (dispatch) => {
  const token = window.localStorage.getItem('token');
  dispatch({ type: GET_ASSIGNMENT_BY_ID_REQUEST });
  axios.get(`/api/teacher/assignment/${assignmentId}`, { headers: { Authorization: token } })
    .then((response) => {
      dispatch({ type: GET_ASSIGNMENT_BY_ID_SUCCESS, payload: response.data.assignment });
    })
    .catch((error) => {
      dispatch({ type: GET_ASSIGNMENT_BY_ID_FAILURE, error: error.response.data });
    });
};

export const getStudentList = song => ({
  type: 'GET_STUDENT_LIST',
  payload: song,
});

export const getStudentAssignment = studentName => ({
  type: 'GET_STUDENT_ASSIGNMENT',
  payload: studentName,
});
