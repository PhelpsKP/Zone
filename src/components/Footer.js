import React from 'react';

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-left">
          <a href="mailto:wttjshow@gmail.com">✉ Business Inquiries</a>
        </div>
        <div className="footer-center">
          <a href="http://www.instagram.com/urbanlegendphelps">
            <i className="fa fa-instagram"></i>
          </a>
          <a href="http://www.youtube.com/@WTTJ">
            <i className="fa fa-youtube"></i>
          </a>
          <a href="http://www.twitter.com/@kylephelps92">
            <i className="fa fa-twitter"></i>
          </a>
        </div>
        <div className="footer-right">
          © Copyright Grogtame Productions 2025
        </div>
      </div>
    </footer>
  );
}

export default Footer;