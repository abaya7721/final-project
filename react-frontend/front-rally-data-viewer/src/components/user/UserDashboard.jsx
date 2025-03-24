import React, { useState, useMemo } from 'react';
import { useUser } from '../../contexts/UserContext';
import { useData } from '../../contexts/DataContext';
import DataTable from '../data/DataTable';
import '../../css/UserDashboard.css';

const UserDashboard = () => {
  const { user } = useUser();
  const { 
    standings, 
    raceResults, 
    vehicleResults, 
    loading, 
    error,
    filters,
    filteredData,
    fetchStandings,
    fetchRaceResults,
    fetchVehicleResults,
    setFilter,
    clearFilters,
    applyFilters
  } = useData();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    clearFilters(); // Clear filters when changing data type
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

  const handleFilterChange = (key, value) => {
    setFilter(key, value);
    // Reapply filters with current data
    const currentData = getCurrentData();
    if (currentData) {
      applyFilters(currentData, selectedOption);
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

  const currentData = getCurrentData();
  const isLoading = loading.standings || loading.raceResults || loading.vehicleResults;
  const currentError = error.standings || error.raceResults || error.vehicleResults;

  // Extract unique values for each filter key from the current data
  const filterOptions = useMemo(() => {
    if (!currentData) return {
      driver: [],
      event: [],
      vehicle: [],
      region: []
    };

    const options = {
      driver: new Set(),
      event: new Set(),
      vehicle: new Set(),
      region: new Set()
    };

    currentData.forEach(item => {
      switch (selectedOption) {
        case 'standings':
          if (item.driverName) options.driver.add(item.driverName);
          if (item.raceName) options.event.add(item.raceName);
          if (item.vehicleMake) options.vehicle.add(item.vehicleMake);
          if (item.region) options.region.add(item.region);
          break;
        case 'results':
          if (item.driverName) options.driver.add(item.driverName);
          if (item.raceName) options.event.add(item.raceName);
          if (item.vehicleMake) options.vehicle.add(item.vehicleMake);
          if (item.region) options.region.add(item.region);
          break;
        case 'vehicle':
          if (item.driverName) options.driver.add(item.driverName);
          if (item.raceName) options.event.add(item.raceName);
          if (item.vehicleMake) options.vehicle.add(item.vehicleMake);
          if (item.region) options.region.add(item.region);
          break;
      }
    });

    // Convert Sets to sorted arrays
    return {
      driver: Array.from(options.driver).sort(),
      event: Array.from(options.event).sort(),
      vehicle: Array.from(options.vehicle).sort(),
      region: Array.from(options.region).sort()
    };
  }, [currentData, selectedOption]);

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

        {currentData && (
          <div className="filter-controls">
            <div className="filter-group">
              <select
                value={filters.vehicle}
                onChange={(e) => handleFilterChange('vehicle', e.target.value)}
                className="filter-select"
              >
                <option value="">All Vehicles</option>
                {filterOptions.vehicle.map(vehicle => (
                  <option key={vehicle} value={vehicle}>
                    {vehicle}
                  </option>
                ))}
              </select>
              <select
                value={filters.driver}
                onChange={(e) => handleFilterChange('driver', e.target.value)}
                className="filter-select"
              >
                <option value="">All Drivers</option>
                {filterOptions.driver.map(driver => (
                  <option key={driver} value={driver}>
                    {driver}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <select
                value={filters.event}
                onChange={(e) => handleFilterChange('event', e.target.value)}
                className="filter-select"
              >
                <option value="">All Events</option>
                {filterOptions.event.map(event => (
                  <option key={event} value={event}>
                    {event}
                  </option>
                ))}
              </select>
              <select
                value={filters.region}
                onChange={(e) => handleFilterChange('region', e.target.value)}
                className="filter-select"
              >
                <option value="">All Regions</option>
                {filterOptions.region.map(region => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>
            <button 
              className="clear-filters-button"
              onClick={() => {
                clearFilters();
                if (currentData) {
                  applyFilters(currentData, selectedOption);
                }
              }}
            >
              Clear Filters
            </button>
          </div>
        )}

        <div className="data-display">
          {isLoading && <div className="loading">Loading...</div>}
          {currentError && <div className="error">{currentError}</div>}
          {filteredData && <DataTable data={filteredData} />}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
