import React, { Component } from 'react';

class Assignments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assigments: [],
    };
  }
  render() {
    return (
      <div>
        <h1>Assignments</h1>
      </div>
    );
  }
}

export default Assignments;
