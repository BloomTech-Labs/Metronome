import 'react-responsive-carousel/lib/styles/carousel.min.css';

import React from 'react';
import BuyNowButton from './buyNowButton';
import MainImage from './mainImage';
import './landingpage.css';

const LandingPage = () => (
  <div className="container">
    <div className="description-container">
      <MainImage />
      <BuyNowButton />
    </div>
  </div>
);

export default LandingPage;
