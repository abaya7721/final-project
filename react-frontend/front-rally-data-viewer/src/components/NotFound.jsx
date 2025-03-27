import React from 'react';
import { Link } from 'react-router-dom';
import '../css/App.css';

const NotFound = () => {
  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>404 - Page Not Found</h2>
        <p style={{ color: '#4a5568', marginBottom: '2rem' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="nav-buttons">
          <Link to="/" className="nav-button nav-button-primary">
            Go Home
          </Link>
          <Link to="/login" className="nav-button nav-button-secondary">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 