import React, { Component } from 'react';
import { injectStripe } from 'react-stripe-elements';
import axios from 'axios';
import CardSection from './CardSection';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import './billing.css';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscribe: false, // 1 month subscription: $20
      client: false, // 1 client purchase: $1.99
      error: null,
      success: null,
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
          // transaction succeed and redirect to add assignment page
          this.setState({ success: 'Pay Successful' });
          window.localStorage.setItem('token', res.data);
          window.location.href = '/dashboard/add-assignment';
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
        <form onSubmit={this.handleSubmit} >
          <div className="header-con" style={{ marginTop: '10%' }}>
            <h2 className="title">BILLING INFORMATION</h2>
            <span>CHOOSE YOUR PLAN</span>
          </div>
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
          <div style={{ color: 'green' }}>{this.state.success}</div>
          <button style={{ width: '100%' }}>Buy Now</button>
        </form>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
