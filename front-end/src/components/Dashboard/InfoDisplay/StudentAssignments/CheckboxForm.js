import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateAssignment } from '../../../../actions';

class CheckboxForm extends Component {
  handleFormSubmit = (progress) => {
    this.props.updateAssignment(progress, this.props.assignmentId);
    this.notify();
  };

  notify = () => toast.info('Assignment Updated!', { position: toast.POSITION.TOP_LEFT });

  render() {
    const { days } = this.props;
    return (
      <div>

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
          <ToastContainer autoClose={3000} />
        </form>
      </div>
    );
  }
}

CheckboxForm = connect(null, { updateAssignment })(CheckboxForm);

export default reduxForm({
  form: 'checkbox',
})(CheckboxForm);
