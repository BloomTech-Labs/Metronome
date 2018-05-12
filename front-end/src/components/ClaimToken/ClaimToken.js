import React from 'react';
import { Redirect } from 'react-router-dom';

const redirect = () => (<Redirect to="/login" />);

const ClaimToken = (props) => {
  const token = props.location.search.split("=")[1];
  console.log(token);

  window.localStorage.setItem('assignmentToken', token);
  return (
    <div>
      {redirect()}
    </div>
  );
};

export default ClaimToken;
