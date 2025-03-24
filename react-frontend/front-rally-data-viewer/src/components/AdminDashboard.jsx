import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import adminBgImage from '/porsche-luca-scalvinoni.jpg';
import '../css/AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const handleOptionClick = (option) => {
    switch (option) {
      case 'Data Manager':
        navigate('/admin/data-manager');
        break;
      case 'Data Viewer':
        navigate('/admin/data-viewer');
        break;
      default:
        navigate('/admin');
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-banner">
        <div className="banner-image-container">
          <img src={adminBgImage} alt="Rally car" className="admin-banner-image" />
        </div>
        <div className="admin-banner-content-container">
          <div className="admin-banner-text">
            <h1 className="banner-title">Admin Dashboard</h1>
            <p className="banner-tagline">Manage and view rally data with ease</p>
            <p className="admin-welcome">Welcome {user.username}</p>
          </div>
        </div>
      </div>

      <div className="admin-options">
        <button 
          className="admin-option-button"
          onClick={() => handleOptionClick('Data Manager')}
        >
          Data Manager
        </button>
        <button 
          className="admin-option-button"
          onClick={() => handleOptionClick('Data Viewer')}
        >
          Data Viewer
        </button>
      </div>

      <nav className="main-nav admin-nav">
        <div className="nav-container">
          <div className="nav-links">
            <a href="/about" className="nav-link">About</a>
            <button 
              onClick={() => {
                logout();
                navigate('/');
              }} 
              className="nav-link logout-button"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AdminDashboard;
