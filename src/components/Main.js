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
          <a href="#" className="btn-support">Support</a>
        </div>
        <div className="support-card">
          <div className="icon-circle">
            <img src="images/YouTube.png" alt="YouTube Members Logo" />
          </div>
          <h3>YouTube Members</h3>
          <a href="#" className="btn-support">Join</a>
        </div>
        <div className="support-card">
          <div className="icon-circle"></div>
          <h3>Merch</h3>
          <a href="#" className="btn-support">Shop</a>
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
          <a href="#" className="social-button">X @KylePhelps92</a>
          <a href="#" className="social-button">IN @KylePhelps92</a>
          <a href="#" className="social-button">BS @KylePhelps92</a>
          <a href="#" className="social-button">TK @KylePhelps92</a>
          <a href="#" className="social-button">OH youtube.com/@BOHP</a>
          <a href="#" className="social-button">FB /ThePhelps</a>
          <a href="#" className="social-button">SP youtube.com/@BOHP</a>
          <a href="#" className="social-button">TW KylePhelps92</a>
        </div>
      </section>

      {/* Power Rankings Section */}
      <section className="power-rankings">
        <h2>Create Your Own Power Rankings</h2>
        <p>
          The Power Rankings Builder is an interactive tool designed to let fans
          create their own NFL team rankings.
        </p>
        <h3>Drag and Drop</h3>
        <p>
          Simply drag and drop team icons into your preferred order, ranking all
          32 teams from best to worst based on your personal criteria—whether
          it's performance, potential, or pure bias.
        </p>
        <h3>Save and Share</h3>
        <p>
          Once your rankings are set, you can save them to share on social media
          or with friends to spark debates and discussions.
        </p>
        <h3>Compare with Others</h3>
        <p>
          See how your rankings stack up against the official Welcome to the
          Jungle rankings or view rankings from other fans in the community.
        </p>
        <p>
          The Power Rankings Builder is all about giving you the power to voice
          your opinions and join the conversation. Ready to show off your
          rankings? Give it a try!
        </p>
      </section>
    </main>
  );
}

export default Main;
