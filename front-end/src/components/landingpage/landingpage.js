import 'react-responsive-carousel/lib/styles/carousel.min.css';

import React from 'react';
import BuyNowButton from './buyNowButton';
import MainImage from './mainImage';
import Description from './description';

const LandingPage = () => (
  <div>
    <MainImage />
    <Description />
    <BuyNowButton />
  </div>
);

export default LandingPage;
