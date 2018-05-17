import React, { Component } from 'react';
import { StripeProvider } from 'react-stripe-elements';
import BillingCheckOut from './BillingCheckout';
import './billing.css';

class Billing extends Component {
  render() {
    return (
      <div className="page-container">
        <div className="billing-container" style={{ maxWidth: 400 }}>
        <StripeProvider apiKey="pk_test_Nn7zHQBxMw8neIiRpUctF1Wc">
          <BillingCheckOut />
        </StripeProvider>
      </div>
      </div>
    );
  }
}

export default Billing;
