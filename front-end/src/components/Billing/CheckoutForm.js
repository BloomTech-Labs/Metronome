import React, { Component } from 'react';
import { injectStripe } from 'react-stripe-elements';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
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

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.checked });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const url = 'http://localhost:3000/api/user/transaction';
    const jwt = window.localStorage.getItem('token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhZWI3Mjk4NTU0NmIwOGJkNDYzYjY0YyIsImVtYWlsIjoiMTIzQDEyMy5jb20iLCJuYW1lIjoidGluZyB3YW5nIiwiZXhwIjoxNTI3OTcxNzM3LCJpYXQiOjE1MjUzNzk3Mzd9.pc5jdU6FYaxiNMnfkW85H2ppAeoo1lcdAt9gcOuOMAQ';
    const decode = jwtDecode(jwt);
    const { id } = decode;
    const { subscribe, client } = this.state;
    if (!subscribe && !client) {
      return this.setState({ error: 'Please select a plan' });
    }
    this.setState({ error: null });

    const subscribeType = this.state.subscribe ? '1 Month' :
      this.state.client ? '1 Client' : false;
    const price = subscribeType === '1 Month' ? '20' :
      subscribeType === '1 Client' ? '1.99' : undefined;

    this.props.stripe.createToken()
      .then(({ token }) => {
        // if (!stripeToken) return this.setState({ error: 'Card information incorrect' });
        this.setState({ error: null });
        console.log('Received Stripe token:', token);
        axios.post(url, {
          userId: id,
          tokenId: token.id,
          subscribeType,
          price,
        }, {
          headers: {
            Authorization: jwt,
          },
        }).then((res) => {
          // redirect to user page
          console.log('Transaction successful', res.data);
        }).catch((error) => {
          console.log('Transaction Error', error);
        });
      })
      .catch((error) => {
        console.log('Error:', error);
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
