import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import isEmail from 'validator/lib/isEmail';
import equals from 'validator/lib/equals';

import './sign-up.css';

// Input Valiations match backend
const PASSWORD_MIN = 8;
const PASSWORD_MAX = 56;
const EMAIL_MIN = 3;
const EMAIL_MAX = 320;
const FNAME_MIN = 1;
const FNAME_MAX = 320;
const LNAME_MIN = 1;
const LNAME_MAX = 5;

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
		alert('submitted');
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
		console.log(`First name length: ${this.state.firstName.length}`);

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
						<div className="pair">
							<input
								name="firstName"
								placeholder="First Name"
								value={this.state.firstName}
								onChange={this.onChange}
							/>

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
								required
							/>
							<span style={{ color: 'red' }}>
								{this.state.errors['passwordConfirm']}
							</span>
						</div>
						<Button
							className="btn--signup"
							variant="raised"
							color="primary"
							onClick={this.onSubmit}
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
