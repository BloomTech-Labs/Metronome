import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import jwtDecode from 'jwt-decode';
import { Link } from 'react-router-dom';

import { Card, CardImg, CardText, CardBody, CardTitle, Col } from 'reactstrap';
import FATrash from 'react-icons/lib/fa/trash';
// import { Z_DEFAULT_STRATEGY } from 'zlib';

const AssignmentCard = (props) => {
  const date = moment(props.dueDate).format('l');
  const { role } = jwtDecode(window.localStorage.getItem('token'));
  return (
    <div>
      <Col>
        <Card>
          {role === 'Teacher'
            ? <Link to={`/dashboard/teacher-assignments/${props.id}`}>
              <CardTitle>{props.name}</CardTitle>
            </Link>
            : <CardTitle>{props.name}</CardTitle>}
          <Link
            to={`/dashboard/${role.toLowerCase()}-assignment-details/${props.id}`}
          >
            <CardImg
              top
              width="225px"
              margin="10px"
              height="200px"
              src={props.musicSheetImage}
              alt="Card image cap"
            />
            <CardBody>
              <CardText>{`Date: ${date}`}</CardText>
            </CardBody>
          </Link>
        </Card>

        {role === 'Teacher' &&
          <FATrash onClick={() => props.deleteAssignment(props.id)} />}
      </Col>
    </div>
  );
};

AssignmentCard.propTypes = {
  deleteAssignment: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  dueDate: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default AssignmentCard;
