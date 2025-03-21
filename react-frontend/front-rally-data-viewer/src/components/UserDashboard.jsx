import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { useData } from '../contexts/DataContext';
import DataTable from './DataTable';
import '../css/UserDashboard.css';

const UserDashboard = () => {
  const { user } = useUser();
  const { 
    standings, 
    raceResults, 
    vehicleResults, 
    loading, 
    error,
    fetchStandings,
    fetchRaceResults,
    fetchVehicleResults
  } = useData();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    switch (option) {
      case 'standings':
        fetchStandings();
        break;
      case 'results':
        fetchRaceResults();
        break;
      case 'vehicle':
        fetchVehicleResults();
        break;
      default:
        break;
    }
  };

  const getCurrentData = () => {
    switch (selectedOption) {
      case 'standings':
        return standings;
      case 'results':
        return raceResults;
      case 'vehicle':
        return vehicleResults;
      default:
        return null;
    }
  };

  const isLoading = loading.standings || loading.raceResults || loading.vehicleResults;
  const currentError = error.standings || error.raceResults || error.vehicleResults;
  const currentData = getCurrentData();

  return (
    <div className="user-dashboard">
      <div className="banner-image-container">
        <div className="banner-background-image"></div>
        <div className="image-overlay"></div>
      </div>
      
      <div className="user-banner-content-container">
        <div className="user-banner-text">
          <h1 className="banner-title">Welcome {user.username}</h1>
          <h2 className="banner-tagline">Select Data</h2>
        </div>

        <div className="data-options">
          <button 
            className={`option-button ${selectedOption === 'standings' ? 'active' : ''}`}
            onClick={() => handleOptionClick('standings')}
          >
            Standings
          </button>
          <button 
            className={`option-button ${selectedOption === 'results' ? 'active' : ''}`}
            onClick={() => handleOptionClick('results')}
          >
            Race Results and Events
          </button>
          <button 
            className={`option-button ${selectedOption === 'vehicle' ? 'active' : ''}`}
            onClick={() => handleOptionClick('vehicle')}
          >
            Race Results and Vehicle
          </button>
        </div>

        <div className="data-display">
          {isLoading && <div className="loading">Loading...</div>}
          {currentError && <div className="error">{currentError}</div>}
          {currentData && <DataTable data={currentData} />}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
