import React, { Component } from 'react';
import { injectStripe } from 'react-stripe-elements';
import CardSection from './CardSection';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscribe: false,
      client: false,
      error: null,
    };
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { subscribe, client } = this.state;
    if (!subscribe && !client) {
      return this.setState({ error: 'Please select a plan' });
    } else {
      this.setState({ error: null });
    }

    this.props.stripe.createToken({})
      .then(({ token }) => {
        console.log('Received Stripe token:', token);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Billing</h1>
          <CardSection />
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.subscribe}
                  onChange={this.handleChange('subscribe')}
                  value="subscribe"
                />
              }
              label="1 Month Subscription - $20"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.client}
                  onChange={this.handleChange('client')}
                  value="client"
                />
              }
              label="1 Client - $1.99"
            />
          </FormGroup>
          <div style={{color: 'red'}}>{this.state.error}</div>
          <button>Buy Now</button>
        </form>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);