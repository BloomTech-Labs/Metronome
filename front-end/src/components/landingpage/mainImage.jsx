import React from 'react';
import { Carousel } from 'react-bootstrap';

const MainImage = () => (
  <div>
    <Carousel>
      <Carousel.Item>
        <img width={900} height={500} alt="900x500" src="/carousel.png" />
        <Carousel.Caption>
          <p>Come One</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img width={900} height={500} alt="900x500" src="/carousel.png" />
        <Carousel.Caption>
          <p>Come All</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  </div>
);

export default MainImage;
