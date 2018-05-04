import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import isEmail from 'validator/lib/isEmail';
import equals from 'validator/lib/equals';

import './sign-up.css';

// Input Valiations match backend
const PASSWORD_MIN = 8;
const PASSWORD_MAX = 56;
const EMAIL_MAX = 320;
const FNAME_MAX = 320;
const LNAME_MAX = 320;

class SignUp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: '',
			errors: {},
		};
	}

	onChange = event => {
		const name = event.target.name;
		const value = event.target.value;

		this.setState({
			[name]: value,
		});
	};

	onSubmit = event => {
		event.preventDefault();

		if (!this.handleValidation()) {
			return;
		}

		// TODO: Use Axios to send data
		this.setState({
			email: '',
			password: '',
			confirmPassword: '',
		});
	};

	handleValidation = () => {
		// Check all requirements are met and return if form is valid
		let errors = {};
		let formIsValid = true;

		// First Name
		if (!this.state.firstName) {
			formIsValid = false;
			errors['firstName'] = 'Cannot be empty';
		}
		if (this.state.firstName.length > FNAME_MAX) {
			formIsValid = false;
			errors['firstName'] = `Must be less than ${FNAME_MAX}`;
		}
		// Last Name
		if (!this.state.lastName) {
			formIsValid = false;
			errors['lastName'] = 'Cannot be empty';
		}
		if (this.state.lastName.length > LNAME_MAX) {
			formIsValid = false;
			errors['lastName'] = `Must be less than ${LNAME_MAX}`;
		}
		// Email check
		if (!isEmail(this.state.email)) {
			formIsValid = false;
			errors['email'] = 'Must be a valid email';
		}

		if (this.state.email.length > EMAIL_MAX) {
			formIsValid = false;
			errors['email'] = `Must be less than ${EMAIL_MAX} characters`;
		}

		// Password check if between values
		if (
			this.state.password.length < PASSWORD_MIN ||
			this.state.password.length > PASSWORD_MAX
		) {
			formIsValid = false;
			errors['password'] = 'Must be between 8 and 56 characters';
		}

		// Password confirmation check
		if (!equals(this.state.password, this.state.confirmPassword)) {
			formIsValid = false;
			errors['passwordConfirm'] = 'Must match entered password';
		}

		this.setState({ errors });
		return formIsValid;
	};

	render() {
		return (
			<div className="form-container">
				<div className="signup-form">
					<form onSubmit={this.onSubmit}>
						<h1>Sign Up</h1>
						<div>
							<select>
								<option value="teacher">Teacher</option>
								<option value="student">Student</option>
							</select>
						</div>
						<div className="pair">
							<input
								name="firstName"
								placeholder="First Name"
								value={this.state.firstName}
								onChange={this.onChange}
							/>
							<br />
							<span style={{ color: 'red' }}>
								{this.state.errors['firstName']}
							</span>
						</div>
						<div className="pair">
							<input
								name="lastName"
								placeholder="Last Name"
								value={this.state.lastName}
								onChange={this.onChange}
							/>
							<br />
							<span style={{ color: 'red' }}>
								{this.state.errors['lastName']}
							</span>
						</div>
						<div className="pair">
							<input
								name="email"
								placeholder="email"
								value={this.state.email}
								onChange={this.onChange}
							/>
							<br />
							<span style={{ color: 'red' }}>{this.state.errors['email']}</span>
						</div>
						<div className="pair">
							<input
								name="password"
								type="password"
								placeholder="password"
								value={this.state.password}
								onChange={this.onChange}
							/>
							<br />
							<span style={{ color: 'red' }}>
								{this.state.errors['password']}
							</span>
						</div>
						<div className="pair">
							<input
								name="confirmPassword"
								type="password"
								placeholder="confirm password"
								value={this.state.confirmPassword}
								onChange={this.onChange}
							/>
							<br />
							<span style={{ color: 'red' }}>
								{this.state.errors['passwordConfirm']}
							</span>
						</div>
						<Button
							style={{ fontSize: '14px' }}
							className="btn--signup"
							variant="raised"
							color="primary"
							type="submit"
						>
							Sign Up
						</Button>
						<br />
						<Link className="link" to="/login">
							Already have an account?
						</Link>
					</form>
				</div>
			</div>
		);
	}
}

export default SignUp;
