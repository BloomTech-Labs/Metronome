import React from 'react';
import BuyNowButton from './components/landingpage/buyNowButton';
import LoginButtons from './components/landingpage/signInSignOut';
import './App.css';

const App = () => (
  <div className="App">
    <LoginButtons />
    <BuyNowButton />
  </div>
);

export default App;
