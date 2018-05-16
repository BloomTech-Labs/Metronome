import 'react-responsive-carousel/lib/styles/carousel.min.css';

import React from 'react';
import MainImage from './mainImage';
import './landingpage.css';

const LandingPage = () => (
  <div className="container-fluid">
    <div className="description-container">
      <MainImage />
    </div>
  </div>
);

export default LandingPage;
