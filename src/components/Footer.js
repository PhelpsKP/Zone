import React from 'react';

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-left">
          <a href="mailto:wttjshow@gmail.com">✉ Business Inquiries</a>
          <a href="https://www.jungle-hub.com/policy.html">Privacy Policy</a>
        </div>
        <div className="footer-center">
          <a href="https://bsky.app/profile/kylephelps92.bsky.social" aria-label="Follow on Bluesky">
            <i className="fa-brands fa-bluesky"></i>
          </a>
          <a href="http://www.youtube.com/@WTTJ" aria-label="Subscribe on YouTube">
            <i className="fa-brands fa-youtube"></i>
          </a>
          <a href="https://twitter.com/kylephelps92" aria-label="Follow on X (Twitter)">
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