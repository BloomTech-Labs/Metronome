import { Button } from 'material-ui';

const AddAssignmentButton = props => (
  <Button variant="raised" onClick={props.onClick}>
		+ Add Assignment
  </Button>
);

const CancelAssignmentButton = props => (
  <Button variant="raised" onClick={props.onClick}>
		- Cancel Assignment
  </Button>
);


