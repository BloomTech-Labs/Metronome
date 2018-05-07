import React, { Component } from 'react';

class Error extends Component {
  render() {
    const { error } = this.props;
    return (
      <div className="error-messages" style={{ color: 'red' }}>
        {error ? error.error : null}
      </div>
    );
  }
}

export default Error;
