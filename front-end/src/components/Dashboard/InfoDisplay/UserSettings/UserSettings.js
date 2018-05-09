import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { updateUser } from '../../../../actions';
import './userSettings.css';
import Error from '../../../Error/Error';

class UserSettings extends Component {
  // componentWillMount() {
  //   const token = window.localStorage.getItem('token');
  //   if (!token) this.props.history.push('/');
  // }

  handleFormSubmit = ({ newEmail, oldPassword, newPassword }) => {
    this.props.updateUser(
      newEmail,
      oldPassword,
      newPassword,
      this.props.history,
    );
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)} style={{ margin: '5rem' }}>
        <Error error={this.props.auth.error} />
        {/* <div className="row">
          <div className="col-25">
            <label htmlFor="firstName">First Name:</label>
          </div>
          <div className="col-75">
            <Field
              type="text"
              name="firstName"
              placeholder="First Name"
              autoComplete="off"
              component="input"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="lastName">Last Name:</label>
          </div>
          <div className="col-75">
            <Field
              type="text"
              name="lastName"
              placeholder="Last Name"
              autoComplete="off"
              component="input"
            />
          </div>
        </div> */}
        <div className="row">
          <div className="col-25">
            <label htmlFor="newEmail">Email:</label>
          </div>
          <div className="col-75">
            <Field
              type="email"
              name="newEmail"
              placeholder="New email"
              autoComplete="off"
              component="input"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="oldPassword">Old Password:</label>
          </div>
          <div className="col-75">
            <Field
              type="password"
              name="oldPassword"
              placeholder="Old Password"
              autoComplete="off"
              component="input"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="newPassword">New Password:</label>
          </div>
          <div className="col-75">
            <Field
              type="password"
              name="newPassword"
              placeholder="New Password"
              autoComplete="off"
              component="input"
            />
          </div>
        </div>
        <div className="row">
          <input type="submit" value="Update" />
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

UserSettings = connect(mapStateToProps, { updateUser })(UserSettings);

export default reduxForm({
  form: 'settings',
  fields: ['newEmail', 'oldPassword', 'newPassword'],
})(UserSettings);
