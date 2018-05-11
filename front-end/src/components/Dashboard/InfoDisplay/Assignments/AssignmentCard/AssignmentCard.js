import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './assignment-card.css';

import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import FATrash from 'react-icons/lib/fa/trash';

const AssignmentCard = (props) => {
  const date = new Date(props.dueDate);
  return (
    <div>
      <Col>
        <Card>
          <Link to={`/dashboard/teacher-assignments/${props.name}`}>
            <CardTitle>{props.name}</CardTitle>
          </Link>
          <Link to={`/dashboard/teacher-assignment-details/${props.id}`}>
            <CardImg
              top
              width="20%"
              src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
              alt="Card image cap"
            />
            <CardBody>
              <CardText>{`Date: ${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`}</CardText>
            </CardBody>
          </Link>
        </Card>

        <FATrash onClick={() => props.deleteAssignment(props.id)} />
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
