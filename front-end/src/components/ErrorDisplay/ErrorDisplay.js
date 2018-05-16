import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ErrorDisplay extends React.Component {
  state = {
    show: false,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors.length) {
      this.setState({ show: true });
    }
  }

  dismiss = () => {
    this.setState({ show: false });
  }

  renderErrors() {
    return this.props.errors.map(error => (
      <div>{error}</div>
    ));
  }

  render() {
    const style = (this.state.show ? {} : { display: 'none' });
    return (
      <div style={style} className="alert alert-warning alert-dismissible" role="alert">
        <button type="button" className="close" onClick={this.dismiss} aria-label="Close"><span aria-hidden="true">&times;</span></button>
        {this.renderErrors()}
      </div>
    );
  }
}

ErrorDisplay.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => {
  for (const reducer of Object.values(state)) {
    if (Array.isArray(reducer.errors) && reducer.errors.length) {
      return { errors: reducer.errors };
    }
  }
  return { errors: [] };
};

export default connect(mapStateToProps, null)(ErrorDisplay);
