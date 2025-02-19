import React from 'react';

function Nav() {
  return (
    <div className="home-nav">
      <nav>
        <button className="hamburger-menu" aria-label="Toggle navigation">
          ☰
        </button>
        <ul className="nav-links">
          <li><a href="wttj.html">The Show</a></li>
          <li><a href="bohp.html">The Podcast</a></li>
          <li><a href="zone.html">Fan Zone</a></li>
          {/* <li><a href="store.html">Store</a></li> To be built and finished later */}
          <li><a href="events.html">Events</a></li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;