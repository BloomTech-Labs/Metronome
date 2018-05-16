import React from 'react';

import BuyNowButton from './buyNowButton.js';
import saycool from './assets/saycool.jpg';




const MainImage = () => (
  <div className="slider-cover wrapper" style={{marginTop: "-2%"}}>
    <div id="slider">
      <div className="slider-content">
        <img src={saycool} alt="Main" />
        <div className="conent">
          <div className="cover">
            <span className="bg-text">A NEW WAY TO PRACTICE</span>
            <h2 className="title">WELCOME TO METRONOME</h2>
            <p>A simple and elegant way for Music Teachers and Students to interact</p>
            <p className="bg-text">CREATE AN ACCOUNT AND PURCHASE A SUBSCRIPTION</p>
            <BuyNowButton />
          </div>
        </div>
      </div>

      <div className="slider-content">
        <img src={saycool} alt="Slogan" />
        <div className="conent">
          <div className="cover">
            <span className="bg-text">LETS PRACTICE</span>
            <h2 className="title">SIMPLE WAY TO SUBMIT ASSIGNMENTS</h2>
            <p>View and edit assignments with just a few clicks</p>
            <BuyNowButton />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default MainImage;
