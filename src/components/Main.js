import React from 'react';

/**
 * Main component containing hero section and power rankings instructions
 */
function Main() {
  const scrollToRanker = () => {
    const rankerSection = document.querySelector('.power-ranking-container');
    if (rankerSection) {
      rankerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">Fan Zone</h1>
        <p className="hero-subtitle">
          Create and share your own NFL Power Rankings! Drag and drop team logos to build
          your rankings, then download and share your picks with the community.
        </p>
        <button onClick={scrollToRanker} className="hero-cta">
          Create Your Rankings
        </button>
      </section>

      {/* Power Rankings Instructions */}
      <section className="power-rankings-instructions">
        <h2>How It Works</h2>
        <ol>
          <li>Drag and drop each team's logo into the spot you think they deserve to be in.</li>
          <li>If you make a mistake, you can drag a team from where you placed them into any other spot,
              or back into the bank.</li>
          <li>If you want to start over, hit the reset button below.</li>
          <li>When you're finished, hit the 'Save' button at the bottom and your browser will download
              a copy of the rankings as an image.</li>
          <li>Share the rankings on social media with your friends! If you're brave, submit them to
            wttjshow@gmail.com. We'll compare these on the show, give you a shoutout, and put together
            a community ranking based on all the entries.</li>
        </ol>
      </section>
    </main>
  );
}

export default Main;
