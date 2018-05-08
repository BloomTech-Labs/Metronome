import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardImg, CardText, CardBody, CardTitle, Col } from 'reactstrap';
import FATrash from 'react-icons/lib/fa/trash';

const AssignmentCard = props => (
  <div>
    <Col>
      <Card>
        <CardTitle>{props.name}</CardTitle>
        <CardImg
          top
          width="20%"
          src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
          alt="Card image cap"
        />
        <CardBody>
          <CardText>{props.dueDate}</CardText>
        </CardBody>
      </Card>

      <FATrash onClick={() => props.deleteAssignment(props.id)} />
    </Col>
  </div>
);

AssignmentCard.propTypes = {
  deleteAssignment: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  dueDate: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  
}

export default AssignmentCard;
