import React from 'react';

function Footer() {
  return (
    <footer>
      <div class="footer-container">
        <div class="footer-left">
          <a href="mailto:wttjshow@gmail.com">✉ Business Inquiries</a>
          <a href="policy.html">Privacy Policy</a>
        </div>
        <div class="footer-center">
          <a href="https://bsky.app/profile/kylephelps92.bsky.social">
            <i class="fa-brands fa-bluesky"></i>
          </a>
          <a href="http://www.youtube.com/@WTTJ">
            <i class="fa-brands fa-youtube"></i>
          </a>
          <a href="http://www.twitter.com/@kylephelps92">
            <i class="fa-brands fa-x-twitter"></i>
          </a>
        </div>
        <div class="footer-right">
          © Copyright Kyle Phelps 2025
        </div>
      </div>
    </footer>
  );
}

export default Footer;