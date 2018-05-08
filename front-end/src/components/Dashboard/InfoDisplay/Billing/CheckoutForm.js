import React, { Component } from 'react';
import { injectStripe } from 'react-stripe-elements';
import axios from 'axios';
import CardSection from './CardSection';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscribe: false, // 1 month subscription: $20
      client: false, // 1 client purchase: $1.99
      error: null,
    };
  }

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.checked });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    // relative url for axios request
    const url = '/api/user/transaction';

    // JWT token pulled from local storage
    const jwt = window.localStorage.getItem('token');
    console.log(jwt);

    const { subscribe, client } = this.state;

    // need to choose the purchase plan
    if (!subscribe && !client) {
      return this.setState({ error: 'Please select a plan' });
    }
    this.setState({ error: null });

    // subscribe type that will send to the backend
    const subscribeType = this.state.subscribe ? '1 Month' :
      this.state.client ? '1 Client' : false;

    // purchase price that will send to backend
    const price = subscribeType === '1 Month' ? '20' :
      subscribeType === '1 Client' ? '1.99' : undefined;

    // create stripe transaction token
    this.props.stripe.createToken()
      .then(({ token }) => {
        if (!token) return this.setState({ error: 'Card information incorrect' });
        this.setState({ error: null });
        console.log('Received Stripe token:', token);

        // once token is created, send request to backend
        // with user id, token id, subscribe type, and price
        axios.post(url, {
          tokenId: token.id,
          subscribeType,
          price,
        }, {
          headers: {
            Authorization: jwt,
          },
        }).then((res) => {
          // transaction succeed and redirect to dashboard page
          console.log('Transaction successful', res.data);
          window.location.href = '/dashboard';
        }).catch((error) => {
          console.log('Transaction Error', error);
        });
      })
      .catch((error) => {
        console.log('Transaction Error:', error);
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} style={{ margin: '5rem' }}>
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
          <div style={{ color: 'red' }}>{this.state.error}</div>
          <button>Buy Now</button>
        </form>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
