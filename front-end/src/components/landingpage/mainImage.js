import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import './landingpage.css';
import mainimage from './assets/metronome.png';
import slogan from './assets/brownose.png';
import guitar from './assets/guitarPractice.png';


const MainImage = () => (
  <div className="slider-cover">
    
      <div id="slider">
        <div className="slider-content">
          <img src={mainimage} alt="" />

          <div className="conent">
            <div className="cover">
                <span className="bg-text">Business 10/12/2016</span>
                <h2 className="title">WelCome To Business Event</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. </p>
                <p className="price">EVENTS Tricket - 100$</p>
                <a href="#" className="btn btn-pri">BUY NOW</a>
            </div>
          <div id="countdown" className="countdown "></div>

          </div>
        </div>

        <div className="slider-content">
            <img src={slogan} alt="" />
            <div className="conent">
          <span className="bg-text">CONFERENCE</span>

          <h2 className="title">BUSINESS CONFERENCE INFO</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. </p>
          <p className="price">base price - 599$</p>
          <a href="#" className="btn btn-pri">Read More</a>
          </div>
        </div>
      </div>
    </div>
);

export default MainImage;
