import React from 'react';
const logo = process.env.PUBLIC_URL + "/images/logo.png";

function Header() {
  return (
    <header>
      <h1>
        <a className="logo" href="https://www.jungle-hub.com">
          <img alt="Home" src={logo} />
        </a>
      </h1>
    </header>
  );
}

export default Header;