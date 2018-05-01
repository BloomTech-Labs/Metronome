import React, { Component } from 'react';
import './login.css';

class Login extends Component {
	constructor() {
		super();
	}

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};
	render() {
		return (
			<div className="center">
				<div className="card">
					<h1>Login</h1>
					<form>
						<input
							className="form-item"
							placeholder="Email"
							name="username"
							type="text"
							onChange={this.handleChange}
						/>
						<input
							className="form-item"
							placeholder="Password "
							name="password"
							type="password"
							onChange={this.handleChange}
						/>
						<input className="form-submit" value="SUBMIT" type="submit" />
					</form>
				</div>
			</div>
		);
	}
}

export default Login;
