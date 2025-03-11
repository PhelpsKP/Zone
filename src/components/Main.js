import React from 'react';

/**
 * Main component containing all primary content sections of the site
 * Includes support options, explanatory text, social links, and power rankings
 */
function Main() {
  return (
    <main>
      {/* Support Options Section - Cards for different platform contribution options */}
      <section className="support-options">
        <div className="support-card">
          <div className="icon-circle">
            <img src="images/Patreon.png" alt="Patreon Logo" />
          </div>
          <h3>Patreon</h3>
          <a href="https://www.patreon.com/WelcometotheJungle" className="btn-support">Support</a>
        </div>
        <div className="support-card">
          <div className="icon-circle">
            <img src="images/YouTube.png" alt="Members Logo" />
          </div>
          <h3>Members</h3>
          <a href="https://www.youtube.com/@WTTJ" className="btn-support">Join</a>
        </div>
        <div className="support-card">
          <div className="icon-circle">
            <img src="images/twitch.png" alt="Twitch Logo" />
          </div>
          <h3>Twitch</h3>
          <a href="https://www.twitch.tv/kylephelps92" className="btn-support">Watch</a>
        </div>
      </section>
      
      {/* Support explanation paragraphs - Details about different support options */}
      <p>
        Welcome to the Jungle thrives because of the support of fans. If you can afford 
        to financially support the show, it helps cover production costs, improve content 
        quality, and bring new features to life. Every contribution, no matter the size, 
        makes a difference — I truly couldn't do this without your help.
      </p>

      <p>
        As a Patreon member, you'll get exclusive perks like early access to
        episodes, behind-the-scenes content, shoutouts on the show, and more.
        It's my way of saying thank you for being part of this incredible
        journey. Patreon members are key parts of what help the show and community grow.
      </p>

      <p>
        In addition to supporting the show through Patreon, you can directly
        contribute as a YouTube Member. You'll unlock exclusive perks like custom 
        badges, members-only emojis, and exclusive live chats. Your membership 
        directly supports production costs, upgrades, and new ideas that keep the
        content fresh. 
      </p>

      <p>
        If you can't afford a monthly subscription, I completely get it. You can 
        still support the show through Super Chats and Super Stickers on YouTube, 
        as well as Bits on Twitch. If you can't contribute financially at all, no 
        worries! The show is free and will always be free. I do it because I love it.
        Simply watching the show and sharing it with friends makes a huge difference.
      </p>

      {/* Social Follow Section - Links to all social media platforms */}
      <section className="social-follow">
        <h2>Follow</h2>
        <div className="social-links">
          <a href="http://www.twitter.com/@kylephelps92" className="social-button">X @KylePhelps92</a>
          <a href="https://www.instagram.com/urbanlegendphelps/" className="social-button">IN @KylePhelps92</a>
          <a href="https://bsky.app/profile/kylephelps92.bsky.social" className="social-button">BS @KylePhelps92</a>
          <a href="https://www.tiktok.com/@kylephelps92" className="social-button">TK @KylePhelps92</a>
          <a href="https://www.youtube.com/@tbohp" className="social-button">OH youtube.com/@BOHP</a>
          <a href="https://www.facebook.com/ThePhelps/ " className="social-button">FB /ThePhelps</a>
          <a href="https://www.facebook.com/battleofohiopodcast" className="social-button">BO battleofohiopodcast</a>
          <a href="https://www.patreon.com/c/WelcometotheJungle" className="social-button">PT KylePhelps92</a>
        </div>
      </section>

      {/* Power Rankings Section - Instructions for the interactive ranking tool */}
      <section className="power-rankings">
        <h2>Create Your Own Power Rankings</h2>
        <ol>
          <li>Drag and drop each team's logo into the spot you think they deserve to be in.</li>
          <li>If you make a mistake, you can drag a team from where you placed them into any other spot,
              or back into the bank.</li>
          <li>If you want to start over, hit the reset button below.</li>
          <li>When you're finished, hit the 'Save' button at the bottom and your browser will download
              a copy of the rankings as an image.</li>
          <li>Share the rankings on social media and your friends! If you're brave, submit them to
            wttjshow@gmail.com. We'll compare these on the show, give you a shoutout, and put together
            a community ranking based on all the entires.</li>
        </ol>
      </section>
    </main>
  );
}

export default Main;