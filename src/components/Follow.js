import React from 'react';

/**
 * Follow component for social media links
 * Displays only selected platforms: X (Twitter), YouTube, Twitch, TikTok, Patreon
 */
function Follow() {
  return (
    <section className="follow-section">
      <h2>Follow & Connect</h2>
      <div className="social-links">
        <a
          href="https://twitter.com/kylephelps92"
          className="social-link"
          aria-label="Follow on X (Twitter)"
        >
          <i className="fa-brands fa-x-twitter"></i>
          <span>@KylePhelps92</span>
        </a>
        <a
          href="https://www.youtube.com/@WTTJ"
          className="social-link"
          aria-label="Subscribe on YouTube"
        >
          <i className="fa-brands fa-youtube"></i>
          <span>@WTTJ</span>
        </a>
        <a
          href="https://www.twitch.tv/kylephelps92"
          className="social-link"
          aria-label="Watch on Twitch"
        >
          <i className="fa-brands fa-twitch"></i>
          <span>kylephelps92</span>
        </a>
        <a
          href="https://www.tiktok.com/@kylephelps92"
          className="social-link"
          aria-label="Follow on TikTok"
        >
          <i className="fa-brands fa-tiktok"></i>
          <span>@kylephelps92</span>
        </a>
        <a
          href="https://www.patreon.com/c/WelcometotheJungle"
          className="social-link"
          aria-label="Support on Patreon"
        >
          <i className="fa-brands fa-patreon"></i>
          <span>WelcometotheJungle</span>
        </a>
      </div>
    </section>
  );
}

export default Follow;
