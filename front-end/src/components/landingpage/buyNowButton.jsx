import React from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import './landingpage.css';

const BuyNowButton = () => (
  <div>
    <ButtonToolbar className="buynow">
      <Button active bsStyle="info" bsSize="large" block>Buy Now</Button>
    </ButtonToolbar>
  </div>
);

export default BuyNowButton;
