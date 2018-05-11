import React from 'react';
import { Carousel } from 'react-responsive-carousel';

import './landingpage.css';

const MainImage = () => (
  <div className="mainimage">
    <Carousel showThumbs={false} showStatus={false} infiniteLoop>
      <div>
        <img alt="cat1" src="https://unsplash.com/photos/VRr9a2rOoBI.jpg" />
      </div>
      <div>
        <img alt="cat2" src="https://i.imgur.com/RI22Rj0.jpg" />
      </div>
      <div>
        <img alt="cat3" src="https://i.imgur.com/e51VBAC.png" />
      </div>
    </Carousel>
  </div>
);

export default MainImage;
