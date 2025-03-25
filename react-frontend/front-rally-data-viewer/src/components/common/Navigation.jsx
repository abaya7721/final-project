import React from 'react';
import { useAuth } from '../../contexts/UserAuthContext';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="main-nav">
      <div className="nav-container">
        <div className="nav-links">
          {user?.role === "ROLE_USER" ? (
            <>
              <a href="/about" className="nav-link">About</a>
              <a href="/user" className="nav-link">User View</a>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </>
          ) : user?.role === "ROLE_ADMIN" ? (
            <>
              <a href="/about" className="nav-link">About</a>
              <a href="/admin" className="nav-link">Admin Dashboard</a>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/" className="nav-link">Home</a>
              <a href="/about" className="nav-link">About</a>
              <a href="/sample-data" className="nav-link">Sample Data</a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
