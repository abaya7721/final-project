import React from 'react';

const Navigation = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <h1 className="header-title">Rally Data Viewer</h1>
          <p className="header-tagline">A site for rally motorsport enthusiasts</p>
         
          <div className="nav-buttons">
            <a href="/signup" className="nav-button nav-button-primary">Sign Up</a>
            <a href="/signin" className="nav-button nav-button-secondary">Sign In</a>
            <a href="/about" className="nav-button nav-button-secondary">About</a>
            <a href="/test" className="nav-button nav-button-secondary">Data Test</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
