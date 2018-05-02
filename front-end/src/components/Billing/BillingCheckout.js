import React, { Component } from 'react';
import { Element } from 'react-stripe-elements';
import InjectedCheckoutForm from './CheckoutForm';

class BillingCheckout extends Component {
  render() {
    return (
      <div>
        <Element>
          <InjectedCheckoutForm />
        </Element>
      </div>
    );
  }
}

export default BillingCheckout;
