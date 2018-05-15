import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import { login } from '../../actions';
import './login.css';


class Login extends Component {
	handleFormSubmit = ({ email, password }) => {
	  this.props.login(email, password, this.props.history);
	};

	render() {
	  return (
      <section id="about" class="container">
        <div class="row">
            <div className="">
                <div class="icon-box">
                    <div class="icon-box-content">
                        <div class="content">

                          <div className="center">
                            <div className="signup-form">
                              <br />
                              <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)} style={{width: '300px'}}>
                                <div>
                                <h2 class="title center">Welcome Back to Metronome</h2>
                                  <Field
                                    placeholder="Email"
                                    name="email"
                                    type="email"
                                    autoComplete="off"
                                    component="input"
                                  />
                                  <br />
                                  <Field
                                    placeholder="Password "
                                    name="password"
                                    type="password"
                                    component="input"
                                    autoComplete="off"
                                  />
                                </div>
                                <input
                                  style={{ fontSize: '14px', width: '300px' }}
                                  type="submit"
                                  value="Log In"
                                ></input>
                                <br />
                                <Link className="link" to="/signup">
                                  Need an Account?
                                </Link>
                              </form>
                            </div>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
          </section>
  
	  );
	}
}

const mapStateToProps = state => ({
  auth: state.auth,
});

Login = connect(mapStateToProps, { login })(Login);

export default reduxForm({
  form: 'login',
  fields: ['email', 'password'],
})(Login);
