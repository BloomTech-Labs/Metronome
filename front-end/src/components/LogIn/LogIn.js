import React, { Component } from 'react';
import Button from 'material-ui/Button';
import './login.css';

import { Link } from 'react-router-dom';

class Login extends Component {
	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};
	render() {
		return (
			<div className="center">
				<div className="signup-form">
					<br />
					<form>
						<div>
							<h1>Login</h1>
							<input
								placeholder="Email"
								name="username"
								type="text"
								onChange={this.handleChange}
							/>
							<br />
							<input
								placeholder="Password "
								name="password"
								type="password"
								onChange={this.handleChange}
							/>
						</div>
						<Button
							style={{ fontSize: '14px' }}
							className="btn--signup"
							variant="raised"
							color="primary"
							type="submit"
						>
							Log In
						</Button>
						<br />
						<Link className="link" to="/signup">
							Need an Account?
						</Link>
					</form>
				</div>
			</div>
		);
	}
}

export default Login;
