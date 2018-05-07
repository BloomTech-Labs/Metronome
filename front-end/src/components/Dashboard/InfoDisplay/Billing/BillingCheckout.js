import React, { Component } from 'react';
import { Elements } from 'react-stripe-elements';
import InjectedCheckoutForm from './CheckoutForm';

class BillingCheckout extends Component {
  render() {
    return (
      <div>
        <Elements>
          <InjectedCheckoutForm />
        </Elements>
      </div>
    );
  }
}

export default BillingCheckout;
