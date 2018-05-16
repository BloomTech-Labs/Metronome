import React from 'react';
import BuyNowButton from './buyNowButton.js';
import mainimage from './assets/metronome.png';
import slogan from './assets/brownose.png';
import saycool from './assets/saycool.jpg';

import './landingpage.css';


const MainImage = () => (
  <div className="slider-cover" style={{marginTop: "-12%"}}>
    <div id="slider">
      <div className="slider-content">
        <img src={saycool} alt="Main Image" />
        <div className="conent">
          <div className="cover">
            <span className="bg-text">WELCOME TO METRONOME</span>
            <h2 className="title">WELCOME TO METRONOME</h2>
            <p>A simple and elegant way for Music Teachers and Students to interact</p>
            <BuyNowButton />
          </div>
        </div>
      </div>

      <div className="slider-content">
        <img src={saycool} alt="Slogan" />
        <div className="conent">
          <div className="cover">
            <span className="bg-text">CONFERENCE</span>
            <h2 className="title">BUSINESS CONFERENCE INFO</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. </p>
            <BuyNowButton />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default MainImage;
