import React from 'react';
import { CardNumberElement, CardExpiryElement, CardCVCElement } from 'react-stripe-elements';

const createOptions = fontSize => ({
  style: {
    base: {
      fontSize,
      letterSpacing: '0.025em',
      fontFamily: 'Source Code Pro, monospace',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
});
class CardSection extends React.Component {
  render() {
    return (
      <div className="payment">
        <CardNumberElement {...createOptions(this.props.fontSize)} />
        <CardExpiryElement {...createOptions(this.props.fontSize)} />
        <CardCVCElement {...createOptions(this.props.fontSize)} />
      </div>
    );
  }
}

export default CardSection;
