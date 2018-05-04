import React from 'react';
import { Route, Link } from 'react-router-dom';

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button,
} from 'reactstrap';

const AssignmentDetails = props => (
  <div>
    {console.log(props)}
    <Link to={`/${props.id}`}>
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
    </Link>
  </div>
);

export default AssignmentDetails;
