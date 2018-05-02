import 'react-responsive-carousel/lib/styles/carousel.min.css';

import React from 'react';
import BuyNowButton from './buyNowButton';
import LoginNavBar from './signInSignUp';
import MainImage from './mainImage';

const LandingPage = () => (
  <div>
    <LoginNavBar />
    <MainImage />
    <BuyNowButton />
  </div>
);

export default LandingPage;
