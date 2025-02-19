import React from 'react';

function Header() {
  return (
    <header>
      <h1>
        <a className="logo" href="index.html">
          <img alt="Home" src="/images/logo.png" />
        </a>
      </h1>
      <div className="video-container">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/rTckKvS-YcQ?autoplay=1&mute=1&loop=1&playlist=rTckKvS-YcQ"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <div className="scroll-indicator">
        <div className="arrow"></div>
      </div>
    </header>
  );
}

export default Header;