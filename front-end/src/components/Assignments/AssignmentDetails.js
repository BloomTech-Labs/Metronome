import React from 'react';

import { Link } from 'react-router-dom';
import FaTrash from 'react-icons/lib/fa/trash';

import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

const AssignmentDetails = props => (
	<div>
		<Card>
			<Link to={`${props.match.url}/assignment-details/${props.id}`}>
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
			</Link>

			<FaTrash onClick={() => props.deleteAssignment(props.id)} />
		</Card>
	</div>
);

export default AssignmentDetails;
