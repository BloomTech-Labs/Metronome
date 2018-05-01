import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';

class MainImage extends Component {
  render() {
    return (
      <Carousel>
        <div>
          <img src="http://lorempixel.com/output/cats-q-c-640-480-1.jpg" />
        </div>
        <div>
          <img src="http://lorempixel.com/output/cats-q-c-640-480-2.jpg" />
        </div>
        <div>
            <img src="http://lorempixel.com/output/cats-q-c-640-480-3.jpg" />
        </div>
      </Carousel>
    );
  }
};

export default MainImage;
