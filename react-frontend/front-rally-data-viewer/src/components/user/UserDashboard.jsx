import React, { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../../contexts/UserAuthContext';
import { useData } from '../../contexts/DataContext';
import DataTable from '../data/DataTable';
import '../../css/UserDashboard.css';

const UserDashboard = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
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

  // Add effect to fetch initial data
  useEffect(() => {
    if (selectedOption) {
      handleOptionClick(selectedOption);
    }
  }, []); // Empty dependency array for initial load

  const handleOptionClick = async (option) => {
    setSelectedOption(option);
    clearFilters(); // Clear filters when changing data type
    
    console.log('Fetching data for option:', option);
    try {
      switch (option) {
        case 'standings':
          await fetchStandings();
          setTitle('Standings');
          break;
        case 'results':
          await fetchRaceResults();
          setTitle('Race Results with Events');
          break;
        case 'vehicle':
          await fetchVehicleResults();
          setTitle('Race Results with Vehicles');
          break;
        default:
          break;
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const handleFilterChange = (key, value) => {
    console.log('Applying filter:', key, value);
    setFilter(key, value);
    // Reapply filters with current data
    const currentData = getCurrentData();
    if (currentData) {
      console.log('Current data before filtering:', currentData);
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

  // Log state changes
  useEffect(() => {
    console.log('Current state:', {
      selectedOption,
      currentData,
      filteredData,
      loading,
      error
    });
  }, [selectedOption, currentData, filteredData, loading, error]);

  // Extract unique values for each filter key from the current data
  const filterOptions = useMemo(() => {
    if (!currentData) {
      console.log('No current data available for filters');
      return {
        driver: [],
        event: [],
        vehicle: [],
        region: [],
        year: ['2016', '2017', '2018']  // Add predefined years
      };
    }

    console.log('Calculating filter options from data:', currentData);
    const options = {
      driver: new Set(),
      event: new Set(),
      vehicle: new Set(),
      region: new Set(),
      year: new Set(['2016', '2017', '2018'])  // Add predefined years
    };

    currentData.forEach(item => {
      if (item.driverName) options.driver.add(item.driverName);
      if (item.raceName) options.event.add(item.raceName);
      if (item.vehicleMake) options.vehicle.add(item.vehicleMake);
      if (item.region) options.region.add(item.region);
      // Add year based on data type
      if (selectedOption === 'results' && item.date) {
        const year = new Date(item.date).getFullYear().toString();
        options.year.add(year);
      } else if (selectedOption === 'vehicle' && item.Year) {
        options.year.add(item.Year);
      } else if (selectedOption === 'standings' && item.Year) {
        options.year.add(item.Year);
      }
    });

    // Convert Sets to sorted arrays
    return {
      driver: Array.from(options.driver).sort(),
      event: Array.from(options.event).sort(),
      vehicle: Array.from(options.vehicle).sort(),
      region: Array.from(options.region).sort(),
      year: Array.from(options.year).sort()
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
          <h1 className="banner-title">Welcome {user?.username}</h1>
          <h2 className="banner-tagline">Select Data</h2>
        </div>

        <div className="controls-section">
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

          {currentData && currentData.length > 0 && (
            <div className="filter-controls">
              <div className="filter-group">
                <select
                  value={filters.vehicle || ''}
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
                  value={filters.driver || ''}
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
                  value={filters.event || ''}
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
                  value={filters.region || ''}
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
              <div className="filter-group">
                <select
                  value={filters.year || ''}
                  onChange={(e) => handleFilterChange('year', e.target.value)}
                  className="filter-select"
                >
                  <option value="">All Years</option>
                  {filterOptions.year.map(year => (
                    <option key={year} value={year}>
                      {year}
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
        </div>
        </div>
        <div className="data-section">
          <div className="data-section-title">Currently Viewing: {title}</div>
          <div className="data-section-subtitle">
            <span>Found {filteredData ? filteredData.length : 0} results</span>
          </div>
          {Object.entries(filters).some(([_, value]) => value) && (
            <div>
              {' '}
              {Object.entries(filters)
                .filter(([_, value]) => value)
                .map(([key, value], index, array) => (
                  <span key={key}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                    {index < array.length - 1 ? ', ' : ''}
                  </span>
                ))}
            </div>
          )}
          {isLoading && <div className="loading">Loading...</div>}
          {currentError && <div className="error">{currentError}</div>}
          {!isLoading && !currentError && filteredData && filteredData.length > 0 ? (
            <div className="data-display">
              <DataTable data={filteredData} />
            </div>
          ) : (
            <div className="data-display"></div>
          )}
        </div>
      
    </div>
  );
};

export default UserDashboard;
