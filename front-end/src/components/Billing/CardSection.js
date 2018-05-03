import React from 'react';
import { CardNumberElement, CardExpiryElement, CardCVCElement } from 'react-stripe-elements';
import Card from 'material-ui/Card';

class CardSection extends React.Component {
  render() {
    return (
      <Card>
        <h4>Payment Info</h4>
        <CardNumberElement />
        <CardExpiryElement />
        <CardCVCElement />
      </Card>
    );
  }
}

export default CardSection;
