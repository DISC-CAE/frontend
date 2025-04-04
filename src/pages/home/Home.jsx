import React, { useContext } from 'react';
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="icons-container">
      <div className="icon-item">
        <a href="/beyond-waste-placeholder">
          <img src="/beyondwaste.png" alt="Beyond Waste" />
        </a>
        <p>Beyond Waste</p>
      </div>
      <div className="icon-item">
        <a href="/edible-evanston-placeholder">
          <img src="/edibleevanston.png" alt="Edible Evanston" />
        </a>
        <p>Edible Evanston</p>
      </div>
      <div className="icon-item">
        <a href="/energy-placeholder">
          <img src="/energy.png" alt="Energy" />
        </a>
        <p>Energy</p>
      </div>
      <div className="icon-item">
        <a href="/environmental-justice-placeholder">
          <img src="/environmentjustice.png" alt="Environmental Justice Evanston" />
        </a>
        <p>Environmental Justice <br /> Evanston</p>
      </div>
      <div className="icon-item">
        <a href="/natural-habitat-placeholder">
          <img src="/naturalhabitat.png" alt="Natural Habitat Evanston" />
        </a>
        <p>Natural Habitat <br /> Evanston</p>
      </div>
      </div>

      <main className="main-content">
      <section className="intro-section">
      <div className="stats-container">
        <div className="stats-header">
          <h1>Since <span className="highlight">2008</span> we've...</h1>
        </div>
        <div className="stats-box">
          <ul className="stats-list">
            <li><span className="bullet-point">●</span> <b>Planted over 4200 trees</b></li>
            <li><span className="bullet-point">●</span> <b>Saved 50 tons of food waste</b></li>
            <li><span className="bullet-point">●</span> <b>Installed 70 gardens</b></li>
          </ul>
        </div>
      </div>

      {/*the scoreboard menu tab goes to the event form rn
      whenever that gets fixed could just change reference idk what the url is as of now*/}
      <a href="/form" className="learn-more-link">Learn more<span className="arrow"></span></a>
      </section>
      </main>

    </div>
  );
};

export default Home;