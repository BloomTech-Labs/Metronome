import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import './landingpage.css';
import mainimage from './assets/MetronomeLogo.jpg';

const MainImage = () => (
  <div className="mainimage">
    <Carousel showThumbs={false} showArrows={false} showStatus={false} infiniteLoop>
      <div>
        <img alt="cat1" src={mainimage} />
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
