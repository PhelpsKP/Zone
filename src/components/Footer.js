import React from 'react';

function Footer() {
  return (
    <footer>
      <div class="footer-container">
        <div class="footer-left">
          <a href="mailto:wttjshow@gmail.com">✉ Business Inquiries</a>
          <a href="policy.html">Privacy Policy</a>
        </div>
        <div className="footer-center">
          <a href="https://bsky.app/profile/kylephelps92.bsky.social">
            <i className="fa-brands fa-bluesky"></i>
          </a>
          <a href="http://www.youtube.com/@WTTJ">
            <i className="fa-brands fa-youtube"></i>
          </a>
          <a href="http://www.twitter.com/@kylephelps92">
            <i className="fa-brands fa-x-twitter"></i>
          </a>
        </div>
        <div className="footer-right">
          © Copyright Kyle Phelps 2025
        </div>
      </div>
    </footer>
  );
}

export default Footer;