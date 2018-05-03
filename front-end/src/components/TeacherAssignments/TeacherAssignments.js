import React from 'react';
import { Grid, Button } from 'material-ui';
import AddAssignmentForm from '../Assignments/AddAssignment/AddAssignmentForm';
import AssignmentList from '../components/Assignments/AssignmentList';

const TeacherAssignments = () => (
  <div>
    <h1>Teacher Assignments</h1>
    <Grid item>
      <AssignmentList assignments={this.state.assignments} />
      {this.props.children}
    </Grid>

    {/* This shows wheter to add assignment or cancel based on state of showAddAssignment */}
    <Grid item justify="center">
      <Button variant="raised" onClick={this.toggleAddAssignment}>
        {this.state.showAddAssignment === false
					? '+ Add Assignment'
					: '- Cancel Assignment'}
      </Button>
    </Grid>
    {/* This toggles showing hte assignment form and passes props to change state and upload assignments here */}
    {this.state.showAddAssignment && (
    <AddAssignmentForm
      addAssignment={this.addAssignment}
      doneAssignment={this.toggleAddAssignment}
    />
		)}
  </div>
);

export default TeacherAssignments;
