import { connect } from 'react-redux';

import { getAssignments } from '../actions';

import Assignments from '../components/Dashboard/InfoDisplay/Assignments/Assignments';

const mapStateToProps = state => ({
  assignments: state.assignments,
});

const mapDispatchToProps = dispatch => ({
  getAssignments: () => dispatch(getAssignments()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Assignments);
