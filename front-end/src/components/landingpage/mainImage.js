import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import './landingpage.css';
import mainimage from './assets/MetronomeLogo.jpg';
import slogan from './assets/brownose.png';
import guitar from './assets/guitarPractice.png';

const MainImage = () => (
  <div className="mainimage">
    <Carousel showThumbs={false} showArrows={false} showStatus={false} infiniteLoop>
      <div>
        <img alt="metronome" src={mainimage} />
      </div>
      <div>
        <img alt="slogan" src={slogan} />
      </div>
      <div>
        <img alt="guitar" src={guitar} />
      </div>
    </Carousel>
  </div>
);

export default MainImage;
