import React, { Component } from 'react';
import { injectStripe } from 'react-stripe-elements';
import CardSection from './CardSection';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscribe: '',
      client: ''
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.stripe.createToken({})
      .then(({ token }) => {
        console.log('Received Stripe token:', token);
      })
  };

  render() {
    return (
      <div className="billing">
        <form onSubmit={this.handleSubmit}>
          <h1>Billing</h1>
          <div>
            <div>
              <h4>Payment Info</h4>
              <CardSection fontSize='16px'/>
            </div>
            <div className="checkbox">
              <div className="checkbox__option">
                <input
                  type="checkbox"
                  value={this.state.subscribe}
                  onChange={() => {}}
                />
                <span>{this.state.subErr}</span>
                1 Month Subscription - $20
              </div>
              <div className="checkbox__option">
                <input
                  type="checkbox"
                  value={this.state.client}
                  onChange={() => {}}
                />
                <span>{this.state.clientErr}</span>
                1 Client - $1.99
              </div>
            </div>
          </div>
          <button>Buy Now</button>
        </form>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);