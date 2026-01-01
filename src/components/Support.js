import React from 'react';

/**
 * Support component containing support options and explanatory text
 */
function Support() {
  return (
    <section className="support-section">
      <h2>Support the Show</h2>

      {/* Support Options Cards */}
      <div className="support-options">
        <div className="support-card">
          <div className="icon-circle">
            <img src="images/Patreon.png" alt="Patreon Logo" />
          </div>
          <h3>Patreon</h3>
          <a href="https://www.patreon.com/WelcometotheJungle" className="btn-support">Support</a>
        </div>
        <div className="support-card">
          <div className="icon-circle">
            <img src="images/YouTube.png" alt="YouTube Members Logo" />
          </div>
          <h3>YouTube Members</h3>
          <a href="https://www.youtube.com/@WTTJ" className="btn-support">Join</a>
        </div>
        <div className="support-card">
          <div className="icon-circle">
            <img src="images/twitch.png" alt="Twitch Logo" />
          </div>
          <h3>Twitch</h3>
          <a href="https://www.twitch.tv/kylephelps92" className="btn-support">Watch</a>
        </div>
      </div>

      {/* Support explanation text */}
      <div className="support-text">
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
      </div>
    </section>
  );
}

export default Support;
