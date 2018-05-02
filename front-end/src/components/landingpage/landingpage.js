import React from 'react';
import BuyNowButton from './buyNowButton';
import LoginButtons from './signInSignUp';
import MainImage from './mainImage';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const LandingPage = () => (
  <div>
    <LoginButtons />
    <MainImage />
    <BuyNowButton />
  </div>
);

export default LandingPage;
