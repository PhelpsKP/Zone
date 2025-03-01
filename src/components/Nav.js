import React, { useState } from 'react';

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="home-nav">
      <nav>
        <button className="hamburger-menu" aria-label="Toggle navigation" onClick={toggleMenu}>
          ☰
        </button>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><a href="https://www.jungle-hub.com/wttj.html">The Show</a></li>
          <li><a href="https://www.jungle-hub.com/bohp.html">The Podcasts</a></li>
          <li><a href="/">Fan Zone</a></li>
          {/* <li><a href="https://www.jungle-hub.com/store.html">Store</a></li> To be built and finished later */}
          <li><a href="https://www.jungle-hub.com/events.html">Events</a></li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;