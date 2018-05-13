import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { updateAssignment } from '../../../../actions';

class CheckboxForm extends Component {
  handleFormSubmit = (updates) => {
    this.props.updateAssignment(updates, this.props.assignmentId);
  };

  render() {
    const { days } = this.props;
    return (
      <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
        <fieldset>
          <legend>Check off when you practice</legend>
          {Object.keys(days).map(day => (
            <div className="day-check-container">
              <div className="box">
                <label htmlFor={day}>{day}</label>
                <Field
                  className="check-box"
                  name={day}
                  label={day}
                  type="checkbox"
                  component="input"
                />
              </div>
            </div>
              ))}
        </fieldset>
        <button style={{ width: 'calc(100% - 30px)' }}>update</button>
      </form>
    );
  }
}

CheckboxForm = connect(null, { updateAssignment })(CheckboxForm);

export default reduxForm({
  form: 'checkbox',
})(CheckboxForm);
