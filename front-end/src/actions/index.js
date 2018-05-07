// import axios from 'axios';

export const GET_ASSIGNMENTS = 'GET_ASSIGNMENTS';
export const DELETE_ASSIGNMENT = 'DELETE_ASSIGNMENT';
export const ADD_ASSIGNMENT = 'ADD_ASSIGNMENT';
export const VIEW_ASSIGNMENT_DETAILS = 'VIEW_ASSIGNMENT_DETAILS';

export const getAssignments = () => ({
  type: 'GET_ASSIGNMENTS',
  payload: getAssignments,
});

export const addAssignment = assignment => ({
  type: 'ADD_ASSIGNMENT',
  payload: assignment,
});

export const deleteAssignment = id => ({
  type: 'DELETE_ASSIGNMENT',
  payload: id,
});

export const viewAssignmentDetails = id => ({
  type: 'VIEW_ASSIGNMENT_DETAILS',
  payload: id,
});
