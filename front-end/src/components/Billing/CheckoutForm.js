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
      <form onSubmit={this.handleSubmit}>
        <CardSection />
        <button>Buy now</button>
      </form>
    );
  }
}

export default injectStripe(CheckoutForm);