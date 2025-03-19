import React from 'react';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h2>About Rally Data Viewer</h2>
        <div className="about-section">
          <h3>Our Mission</h3>
          <p>
            Rally Data Viewer is dedicated to providing rally motorsport enthusiasts
            with comprehensive data and insights about their favorite sport. We aim
            to make rally data accessible, understandable, and engaging for everyone.
          </p>
        </div>
        
        <div className="about-section">
          <h3>What We Offer</h3>
          <ul>
            <li>Detailed rally event statistics</li>
            <li>Driver and team performance data</li>
            <li>Historical rally records</li>
          </ul>
        </div>

        <div className="about-section">
          <h3>Join Our Community</h3>
          <p>
            Become a member of Rally Data Viewer to access exclusive features and
            connect with other rally enthusiasts. Sign up now to start exploring
            the world of rally motorsport data!
          </p>
          <a href="/signup" className="about-button">Get Started</a>
        </div>
      </div>
    </div>
  );
};

export default About; 