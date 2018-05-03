import 'react-responsive-carousel/lib/styles/carousel.min.css';

import React from 'react';
import BuyNowButton from './buyNowButton';
import LoginNavBar from './signInSignUp';
import MainImage from './mainImage';
import Description from './description';

const LandingPage = () => (
  <div>
    <LoginNavBar />
    <MainImage />
    <Description />
    <BuyNowButton />
  </div>
);

export default LandingPage;
