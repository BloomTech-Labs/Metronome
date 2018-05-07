import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';

// import Assignments from '../Assignments/Assignments';
// import Billing from '../Billing';
// import UserSettings from '../UserSettings/UserSettings';

const Menu = ({ match }) => (
	<div>
		<Container>
			<Row>
				<Col md={3}>
					<ul>
						<li>
							<Link to={`${match.url}/assignments`}>assignments</Link>{' '}
						</li>
						<li>
							<Link to={`${match.url}/billing`}>billing</Link>{' '}
						</li>
						<li>
							<Link to={`${match.url}/settings`}>settings</Link>{' '}
						</li>
					</ul>
				</Col>
			</Row>
		</Container>
	</div>
);

export default Menu;
