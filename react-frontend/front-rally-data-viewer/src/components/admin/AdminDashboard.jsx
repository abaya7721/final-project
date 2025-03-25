import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/UserAuthContext';
import adminBgImage from '/porsche-luca-scalvinoni.jpg?url';
import '../../css/AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

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
            <p className="admin-welcome">Welcome</p>
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
    </div>
  );
};

export default AdminDashboard;
