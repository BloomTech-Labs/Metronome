import 'react-responsive-carousel/lib/styles/carousel.min.css';

import React from 'react';
import BuyNowButton from './buyNowButton';
import MainImage from './mainImage';
import Description from './description';
import './landingpage.css';

const LandingPage = () => (
  <div className="container">
    <MainImage />
    <Description />
    <BuyNowButton />
  </div>
);

export default LandingPage;
