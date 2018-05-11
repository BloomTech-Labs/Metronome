import React from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './landingpage.css';

const BuyNowButton = () => (
  <div>
    <LinkContainer to="/dashboard/billing">
      <ButtonToolbar className="buynow">
        <Button active bsStyle="info" bsSize="small" block>Buy Now</Button>
      </ButtonToolbar>
    </LinkContainer>
  </div>
);

export default BuyNowButton;
