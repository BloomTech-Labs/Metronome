import React from 'react';

const Error = (props) => {
  const { error } = props;
  return (
    <div style={{ color: 'red' }}>
      {error ? error.error : null}
    </div>
  );
};

export default Error;
