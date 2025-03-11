import React from 'react';
import '../reset.css';
import '../zone.css';

const Banner = () => {
  return (
    <div className="banner-container">
      <img className="banner" src={`${process.env.PUBLIC_URL}/images/Web.png`} alt="Welcome to the Jungle, Everyone!" />
    </div>
  );
};

export default Banner;