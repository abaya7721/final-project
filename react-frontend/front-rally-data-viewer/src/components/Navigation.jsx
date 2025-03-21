import React from 'react';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="main-nav">
      <div className="nav-container">
        <div className="nav-links">
        {user.authority === "USER" ? (
            <>
              <a href="/about" className="nav-link">About</a>
              <a href="/test" className="nav-link">Data Test</a>
              <a href="/user" className="nav-link">User View</a>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </>
          ) : user.authority === "ADMIN" ? (
            <>
              <a href="/about" className="nav-link">About</a>
              <a href="/test" className="nav-link">Data Test</a>
              <a href="/admin" className="nav-link">Admin Dashboard</a>
              <a href="/user" className="nav-link">User View</a>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/" className="nav-link">Home</a>
              <a href="/about" className="nav-link">About</a>
              <a href="/test" className="nav-link">Data Test</a>
            </>
          )}
        </div>
        </div>
    </nav>
  );
};
export default Navigation;
