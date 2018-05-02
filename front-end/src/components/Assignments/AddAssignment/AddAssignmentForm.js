import React, { Component } from 'react';
import { Grid, Checkbox } from 'material-ui';

class AddAssignmentForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			assignmentName: '',
			daysToPractice: [],
			hoursToPractice: 0,
			checkedMonday: false,
			checkedSunday: false,
			checkedTuesday: false,
			checkedWednesday: false,
			checkedThursday: false,
			checkedFriday: false,
			checkedSaturday: false,
			dueDate: '',
			musicFile: '',
			email: '',
		};
	}

	handleChange = name => event => {
		// TODO: change hour box to display state data of hours
		this.setState({ [name]: event.target.checked });
	};
	render() {
		return (
			<div>
				<Grid container spacing={24} align="center">
					<Grid item xs={12}>
						<h1 className="title">Assignment Name</h1>
					</Grid>
					<div align="center">
						<Grid item xs={16}>
							<Checkbox
								className="daysToPractice"
								checked={this.state.checkedSunday}
								onChange={this.handleChange('checkedSunday')}
								value="checkedSunday"
							/>
							<label for="checkedSunday">Sunday</label>
							<Checkbox
								className="daysToPractice"
								checked={this.state.checkedMonday}
								onChange={this.handleChange('checkedMonday')}
								value="checkedMonday"
							/>
							<label for="checkedMonday">Monday</label>
							<Checkbox
								className="daysToPractice"
								checked={this.state.checkedTuesday}
								onChange={this.handleChange('checkedTuesday')}
								value="checkedTuesday"
							/>
							<label for="checkedTuesday">Tuesday</label>
							<Checkbox
								className="daysToPractice"
								checked={this.state.checkedWednesday}
								onChange={this.handleChange('checkedWednesday')}
								value="checkedWednesday"
							/>
							<label for="checkedWednesday">Wednesday</label>
							<Checkbox
								className="daysToPractice"
								checked={this.state.checkedThursday}
								onChange={this.handleChange('checkedThursday')}
								value="checkedThursday"
							/>
							<label for="checkedThursday">Thursday</label>
							<Checkbox
								className="daysToPractice"
								checked={this.state.checkedFriday}
								onChange={this.handleChange('checkedFriday')}
								value="checkedFriday"
							/>
							<label for="checkedFriday">Friday</label>
							<Checkbox
								className="daysToPractice"
								checked={this.state.checkedSaturday}
								onChange={this.handleChange('checkedSaturday')}
								value="checkedSaturday"
							/>
							<label for="checkedSaturday">Saturday</label>
						</Grid>
					</div>
				</Grid>
			</div>
		);
	}
}

export default AddAssignmentForm;
