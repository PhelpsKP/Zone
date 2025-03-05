import React from 'react';

function Main() {
  return (
    <main className="fan-zone-main">
      {/* Support Options Section */}
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
          <a href="https://https://www.twitch.tv/kylephelps92" className="btn-support">Watch</a>
        </div>
        <p>
          Welcome to the Jungle thrives because of fans like you, and Patreon is
          a crucial way to keep the show growing. Your support helps cover
          production costs, improve content quality, and bring new features to
          life. Every contribution, no matter the size, makes a difference—I
          truly couldn’t do this without your help!
        </p>
        <p>
          As a Patreon member, you’ll get exclusive perks like early access to
          episodes, behind-the-scenes content, shoutouts on the show, and more.
          It’s my way of saying thank you for being part of this incredible
          journey. Join the community, support the show, and help take Welcome
          to the Jungle to the next level!
        </p>
        <p>
          Our incredible community powers the show, and YouTube Memberships are
          a game-changer in helping the show grow. Your membership directly
          supports production costs, upgrades, and new ideas that keep the
          content fresh and exciting. I truly couldn’t do this without the
          amazing support of viewers like you!
        </p>
        <p>
          By becoming a YouTube Member, you’ll unlock exclusive perks like
          custom badges, members-only emojis, early access to videos, and
          exclusive live chats. It’s a special way to connect with the show and
          be recognized as a key part of the community. Join today, and let’s
          take Welcome to the Jungle to new heights together!
        </p>
      </section>

            {/* Social Follow Section */}
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

      {/* Power Rankings Section */}
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
