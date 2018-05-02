import React, { Component } from 'react';
import { StripeProvider } from 'react-stripe-elements';
import BillingCheckOut from './BillingCheckout';

class Billing extends Component {
  render() {
    return (
      <div>
        <StripeProvider apiKey="pk_test_Nn7zHQBxMw8neIiRpUctF1Wc">
          <BillingCheckOut />
        </StripeProvider>
      </div>
    );
  }
}

export default Billing;
