import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import { Grid, Checkbox } from 'material-ui';
import 'react-datepicker/dist/react-datepicker.css';

import './add-assignment.css';

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
			startDate: moment(),
			file: null,
		};
	}

	handleStateDataChange = event => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	handleChange = name => event => {
		// TODO: change hour box to display state data of hours
		this.setState({ [name]: event.target.checked });
	};

	handledDateChange = date => {
		this.setState({
			startDate: date,
		});
	};

	handleFileUpload = event => {
		this.setState({
			file: event.target.files[0],
		});
	};

	fileUpload = file => {
		// TODO: add url
		// const url = 'our api here'
		const formData = new FormData();
		formData.append('file', file);
		const config = {
			headers: {
				'content-type': 'mutlipart/form-data',
			},
		};
	};

	render() {
		return (
			<div>
				<div style={{ margin: 40 }}>
					<Grid container spacing={0} align="center">
						<Grid item xs={12}>
							<h1 className="title">Assignment Name</h1>
						</Grid>
						<Grid container spacing={0} justify="center">
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
						</Grid>
						<Grid container justify="center">
							<Grid item />
							<input
								className="hours"
								name="hours"
								type="text"
								placeholder="0"
								value={this.state.hoursToPractice}
							/>
							<label for="hours">hrs</label>
							<DatePicker
								className="date-picker"
								selected={this.state.startDate}
								onChange={this.handledDateChange}
							/>
							<Grid item>
								<input type="file" onChange={this.handleFileUpload} />
							</Grid>
						</Grid>
						<Grid container justify="center">
							<input
								type="email"
								name="email"
								value={this.state.email}
								onChange={this.handleStateDataChange}
							/>
						</Grid>
					</Grid>
				</div>
			</div>
		);
	}
}

export default AddAssignmentForm;
