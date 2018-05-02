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
			showAddAssignment: true,

			assignments: [
				{
					music: 'music details',
					dueDate: '05/05/18',
					client: 'John Doe',
				},
				{
					music: 'music details2',
					dueDate: '05/07/18',
					client: 'Alyson Cramer',
				},
			],
		};
	}

	//TODO: On componentDidMount fetch assignments
	//TODO: add assignments post to database

	addAssignment = () => {
		alert('add assignment');
		console.log(this.state.addAssignment);
		this.setState({
			showAddAssignment: true,
		});
	};

	render() {
		const addAssignment = this.state.addAssignment;
		return (
			<div>
				<Dashboard title="Teacher" />
				<Grid container xs={12}>
					<Grid item sm={3}>
						<SideMenu />
					</Grid>

					<Grid item>
						<AssignmentList assignments={this.state.assignments} />
					</Grid>
				</Grid>
				<Button variant="raised" onClick={this.addAssignment}>
					+ Add Assignment
				</Button>
				{this.state.showAddAssignment && <AddAssignmentForm />}
			</div>
		);
	}
}

export default TeacherDashboard;
