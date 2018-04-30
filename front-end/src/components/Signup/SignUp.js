import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import './sign-up.css';

class SignUp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			email: '',
			password: '',
			confirmPassword: '',
		};
	}

	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value,
		});
	};

	handleSubmit = event => {
		event.preventDefault();

		console.log(this.state);

		// Clear state back to nothing after submit
		this.setState({
			email: '',
			password: '',
			confirmPassword: '',
		});
	};

	render() {
		return (
			<div className="signup-form">
				<h1>Sign Up</h1>
				<Form onSubmit={this.handleSubmit}>
					<FormGroup>
						<Label for="email">Email</Label>
						<Input
							type="email"
							name="email"
							id="email"
							placeholder="email"
							value={this.state.email}
							onChange={this.handleChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="password">Password</Label>
						<Input
							type="password"
							name="password"
							id="password"
							placeholder="password"
							value={this.state.password}
							onChange={this.handleChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="confirmPassword">Confirm Password</Label>
						<Input
							type="password"
							name="confirmPassword"
							id="confirmPassword"
							placeholder="confirm password"
							value={this.state.confirmPassword}
							onChange={this.handleChange}
						/>
					</FormGroup>
					<Button color="primary" type="submit">
						Sign Up
					</Button>
				</Form>
			</div>
		);
	}
}

export default SignUp;
