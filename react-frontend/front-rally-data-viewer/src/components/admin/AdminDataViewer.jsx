import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import DataTable from '../data/DataTable';
import { useScrollToComponent } from '../../hooks/useScrollToComponent';
import '../../css/AdminDataViewer.css';

const AdminDataViewer = () => {
  const [viewResult, setViewResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const componentRef = useScrollToComponent();

  const getEndpoint = (option) => {
    switch (option) {
      case 'drivers':
        return 'rally/drivers';
      case 'events':
        return 'rally/events';
      case 'teams':
        return 'rally/teams';
      case 'vehicles':
        return 'rally/vehicles';
      default:
        return option;
    }
  };

  const viewApiCall = async (option) => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = getEndpoint(option);
      const response = await fetch(`http://localhost:8080/${endpoint}`);
      const data = await response.json();
      setViewResult(data);
    } catch (err) {
      setError('Failed to connect to the API');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setViewResult(null);
  };

  return (
    <div ref={componentRef} className="admin-viewer-container">
      <div className="admin-viewer-content">
        <div className="admin-mode-banner">
          <h1>Admin Mode</h1>
          <p>Data Viewer Console</p>
        </div>

        <div className="viewer-section">
          <h2>Rally Data Explorer</h2>
          <div className="viewer-options">
            <button 
              className={`viewer-option-button ${selectedOption === 'drivers' ? 'active' : ''}`}
              onClick={() => handleOptionSelect('drivers')}
            >
              Drivers
            </button>
            <button 
              className={`viewer-option-button ${selectedOption === 'events' ? 'active' : ''}`}
              onClick={() => handleOptionSelect('events')}
            >
              Events
            </button>
            <button 
              className={`viewer-option-button ${selectedOption === 'teams' ? 'active' : ''}`}
              onClick={() => handleOptionSelect('teams')}
            >
              Teams
            </button>
            <button 
              className={`viewer-option-button ${selectedOption === 'vehicles' ? 'active' : ''}`}
              onClick={() => handleOptionSelect('vehicles')}
            >
              Vehicles
            </button>
          </div>

          {selectedOption && (
            <div className="viewer-action">
              <button 
                onClick={() => viewApiCall(selectedOption)} 
                className="viewer-button"
                disabled={loading}
              >
                {loading ? 'Loading...' : `View ${selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)} Data`}
              </button>
            </div>
          )}
          
          {error && (
            <div className="viewer-error">
              {error}
            </div>
          )}
          
          {viewResult && (
            <div className="viewer-result">
              <h4>Data Results:</h4>
              <DataTable data={viewResult} />
            </div>
          )}
        </div>

        <div className="admin-navigation">
          <NavLink to="/admin/data-manager" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Data Manager
          </NavLink>
          <NavLink to="/admin" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AdminDataViewer; 