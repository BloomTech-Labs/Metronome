import React, { Component } from 'react';
import './sign-up.css';

class SignUp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			confirmPassword: '',
		};
	}

	onChange = event => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	onSubmit = event => {
		event.preventDefault();
		this.setState({
			email: '',
			password: '',
			confirmPassword: '',
		});
	};

	render() {
		return (
			<div className="signup-form">
				<form>
					<h1>Sign Up</h1>
					<input
						name="email"
						placeholder="email"
						value={this.state.email}
						onChange={this.onChange}
						required
					/>
					<br />

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
					<button onClick={this.onSubmit}>Sign Up</button>
				</form>
			</div>
		);
	}
}

export default SignUp;
