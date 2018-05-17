import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {connect} from 'react-redux';
import {Card, CardBody, CardTitle, CardSubtitle} from 'reactstrap';
import {getAssignments} from '../../../../actions';
import CheckboxForm from './CheckboxForm';

import './studentassignment.css';

class StudentAssignment extends Component {
  constructor (props) {
    super (props);
    this.state = {
      checked: false,
    };
  }
  componentDidMount () {
    this.props.getAssignments ();
  }

  toggleCheck = () => {
    this.setState ({
      checked: !this.state.checked,
    });
  };

  render () {
    if (
      this.props.assignments.isPending ||
      !this.props.assignments.assignments.length
    ) {
      return <div>Loading...</div>;
    }
    const {assignmentId} = this.props.match.params;
    const filterAssignment = this.props.assignments.assignments.filter (
      assignment => assignment._id === assignmentId
    );
    const musicImage = filterAssignment[0].musicSheetAddr;
    const date = moment (filterAssignment[0].dueDate).format ('l');
    const {days} = filterAssignment[0];
    return (
      <div className="body">
        <Card>
          <CardBody>
            <CardTitle>{filterAssignment[0].name}</CardTitle>
            <CardSubtitle>{date}</CardSubtitle>
          </CardBody>

          <img width="350px" height="200px" src={musicImage} alt="img" />
          <div className="days-container">
            <CheckboxForm days={days} assignmentId={assignmentId} />
          </div>

          <div className="form">
            <h3>Practice {filterAssignment[0].hours} hour per day</h3>
            <button className="btn">
              <i className="fa fa-download" />
              <a href={filterAssignment[0].musicSheetAddr}>
                {filterAssignment[0].fileName}
              </a>

            </button>
            <div className='btn_all-assignments'>
            <button 
          onClick={() => this.props.history.push ('/dashboard/assignments')}>
          All Assignments
        </button>
        </div>
          </div>
        </Card>
        
      </div>
    );
  }
}

StudentAssignment.propTypes = {
  getAssignments: PropTypes.func.isRequired,
  assignments: PropTypes.arrayOf.isRequired,
  match: PropTypes.shape ({
    params: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({assignments: state.assignments});

export default connect (mapStateToProps, {getAssignments}) (StudentAssignment);
