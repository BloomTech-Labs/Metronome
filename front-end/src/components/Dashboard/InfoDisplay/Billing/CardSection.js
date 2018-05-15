import React from 'react';
import { CardNumberElement, CardExpiryElement, CardCVCElement } from 'react-stripe-elements';
import Card from 'material-ui/Card';

const style = {
  base: {
    iconColor: '#c4f0ff',
    fontWeight: 500,
    fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
    fontSize: '16px',
    fontSmoothing: 'antialiased',
    '::placeholder': {
      color: '#87BBFD',
    },
  },
  invalid: {
    iconColor: 'red',
    color: 'red',
  },
};
class CardSection extends React.Component {
  render() {
    return (
      <Card style={{ display: 'flex', flexDirection: 'column', padding: '0 1rem' }}>
        <h3>Payment Info</h3>
        <label>
          Card number
          <CardNumberElement
            style={style}
          />
        </label>
        <label>
          Expiration date
          <CardExpiryElement
            style={style}
          />
        </label>
        <label>
          CVC
          <CardCVCElement
            style={style}
          />
        </label>
      </Card>
    );
  }
}

export default CardSection;
