import React, { Component } from 'react';
// import { Route } from 'react-router-dom';
import SideMenu from '../components/SideMenu/SideMenu';
import AssignmentList from '../components/Assignments/AssignmentList';
import Dashboard from './Dashboard';
import AddAssignmentForm from '../components/Assignments/AddAssignment/AddAssignmentForm';

import { AppBar, Toolbar, Typography, Grid, Button } from 'material-ui';

class TeacherDashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showAddAssignment: false,

			assignments: [
				{
					assignmentName: 'Mary Had A Little Lamb',
					daysToPractice: ['Monday', 'Tuesday', 'Friday'],
					hoursToPractice: 2,
					dueDate: '05/05/18',
					musicFile: 'MusicSheet.pdf',
					email: 'playingpiano@gmail.com',
					clientName: 'Ralph Waldo Emerson',
				},
			],
		};
	}

	//TODO: On componentDidMount fetch assignments
	//TODO: add assignments post to database

	//
	addAssignment = assignment => {
		// This takes info form the form and adds it to the state
		// That is then passed down to AssignmentList
		this.setState({
			assignments: [...this.state.assignments, assignment],
		});
	};

	// Toggles whether to show the assignment form or not
	toggleAddAssignment = () => {
		this.setState({
			showAddAssignment: !this.state.showAddAssignment,
		});
	};

	render() {
		const addAssignment = this.state.addAssignment;
		return (
			<div>
				<Dashboard title="Teacher" />
				<Grid container xs={12} space={0}>
					<Grid item sm={3}>
						<SideMenu />
					</Grid>

					<Grid item>
						<AssignmentList assignments={this.state.assignments} />
					</Grid>
				</Grid>

				{/* This shows wheter to add assignment or cancel based on state of showAddAssignment */}
				<Grid item justify="center">
					<Button variant="raised" onClick={this.toggleAddAssignment}>
						{this.state.showAddAssignment === false
							? '+ Add Assignment'
							: '- Cancel Assignment'}
					</Button>
				</Grid>
				{/* This toggles showing hte assignment form and passes props to change state and upload assignments here*/}
				{this.state.showAddAssignment && (
					<AddAssignmentForm
						addAssignment={this.addAssignment}
						doneAssignment={this.toggleAddAssignment}
					/>
				)}
			</div>
		);
	}
}

export default TeacherDashboard;
