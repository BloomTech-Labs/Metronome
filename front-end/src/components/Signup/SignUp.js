import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import isEmail from 'validator/lib/isEmail';
import equals from 'validator/lib/equals';

import './sign-up.css';

class SignUp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			confirmPassword: '',
			errors: {
				email: false,
			},
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
		if (!this.validForm()) {
			alert('nope');
			return;
		}
		console.log(this.state);
		this.setState({
			email: '',
			password: '',
			confirmPassword: '',
		});
	};



	validForm = () => {
		// Check for valid email
		const validEmail = isEmail(this.state.email);
		return (
			validEmail &&
			// Check if password is required length
			this.state.password.length >= 6 &&
			// Check if passwords match
			equals(this.state.password, this.state.confirmPassword)
		);
	};

	render() {
		return (
			<div className="form-container">
				<div className="signup-form">
					<form onSubmit={this.onSubmit}>
						<h1>Sign Up</h1>
						<div className="pair">
							<input
								name="email"
								placeholder="email"
								value={this.state.email}
								onChange={this.onChange}
								required
							/>

							<br />
							<label for="email">
								{this.state.errors.email ? 'Email Invalid' : ''}
							</label>
						</div>
						<input
							name="password"
							type="password"
							placeholder="password"
							value={this.state.password}
							onChange={this.onChange}
							required
						/>
						<br />
						<input
							name="confirmPassword"
							type="password"
							placeholder="confirm password"
							value={this.state.confirmPassword}
							onChange={this.onChange}
							required
						/>
						<br />
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
