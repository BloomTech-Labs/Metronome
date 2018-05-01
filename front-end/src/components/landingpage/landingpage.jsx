import React from 'react';
import BuyNowButton from './buyNowButton';
import LoginButtons from './signInSignUp';
import MainImage from './mainImage';

const LandingPage = () => (
  <div>
    <LoginButtons />
    <MainImage />
    <BuyNowButton />
  </div>
);

export default LandingPage;
