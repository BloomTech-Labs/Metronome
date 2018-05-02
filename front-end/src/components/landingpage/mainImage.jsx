import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import './landingpage.css';

const MainImage = () => (
  <div className="mainimage">
    <Carousel showThumbs={false} showStatus={false} infiniteLoop>
      <div>
        <img alt="cat1" src="http://lorempixel.com/output/cats-q-c-640-480-1.jpg" />
      </div>
      <div>
        <img alt="cat2" src="http://lorempixel.com/output/cats-q-c-640-480-2.jpg" />
      </div>
      <div>
        <img alt="cat3" src="http://lorempixel.com/output/cats-q-c-640-480-3.jpg" />
      </div>
    </Carousel>
  </div>
);

export default MainImage;
