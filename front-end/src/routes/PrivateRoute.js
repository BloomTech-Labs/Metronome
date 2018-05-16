import React, { Component } from 'react';

export default function (ComposedComponent) {
  class PrivateRoute extends Component {
    componentWillMount() {
      const token = window.localStorage.getItem('token');
      if (!token) {
        this.props.history.push('/login');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  return PrivateRoute;
}
