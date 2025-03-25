import React, { createContext, useContext, useReducer, useState } from 'react';
import { dataReducer, initialState } from '../reducers/dataFilter';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);
  const [standings, setStandings] = useState([]);
  const [raceResults, setRaceResults] = useState([]);
  const [vehicleResults, setVehicleResults] = useState([]);
  const [loading, setLoading] = useState({
    standings: false,
    raceResults: false,
    vehicleResults: false
  });
  const [error, setError] = useState({
    standings: null,
    raceResults: null,
    vehicleResults: null
  });

  const setFilter = (key, value) => {
    console.log('Setting filter:', key, value);
    dispatch({ type: 'SET_FILTER', payload: { key, value } });
  };

  const clearFilters = () => {
    console.log('Clearing all filters');
    dispatch({ type: 'CLEAR_FILTERS' });
  };

  const applyFilters = (data, dataType) => {
    console.log('Applying filters to data type:', dataType, 'Data length:', data?.length);
    dispatch({ type: 'APPLY_FILTERS', payload: { data, dataType } });
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem('key');
    if (!token) {
      console.warn('No auth token found in localStorage');
      return {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };
    }
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  const fetchStandings = async () => {
    setLoading(prev => ({ ...prev, standings: true }));
    setError(prev => ({ ...prev, standings: null }));
    try {
      console.log('Fetching standings...');
      const response = await fetch('http://localhost:8080/rally/standings2016', {
        method: 'GET',
        headers: getAuthHeaders()
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Standings fetch failed:', response.status, errorData);
        throw new Error(`Failed to fetch standings data: ${response.status} - ${JSON.stringify(errorData)}`);
      }
      
      const data = await response.json();
      console.log('Standings data received:', data?.length, 'records');
      setStandings(data);
      applyFilters(data, 'standings');
    } catch (err) {
      console.error('Error fetching standings:', err);
      setError(prev => ({ ...prev, standings: err.message }));
    } finally {
      setLoading(prev => ({ ...prev, standings: false }));
    }
  };

  const fetchRaceResults = async () => {
    setLoading(prev => ({ ...prev, raceResults: true }));
    setError(prev => ({ ...prev, raceResults: null }));
    try {
      console.log('Fetching race results...');
      const response = await fetch('http://localhost:8080/rally/results2016', {
        method: 'GET',
        headers: getAuthHeaders()
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Race results fetch failed:', response.status, errorData);
        throw new Error(`Failed to fetch race results data: ${response.status} - ${JSON.stringify(errorData)}`);
      }
      
      const data = await response.json();
      console.log('Race results data received:', data?.length, 'records');
      setRaceResults(data);
      applyFilters(data, 'raceResults');
    } catch (err) {
      console.error('Error fetching race results:', err);
      setError(prev => ({ ...prev, raceResults: err.message }));
    } finally {
      setLoading(prev => ({ ...prev, raceResults: false }));
    }
  };

  const fetchVehicleResults = async () => {
    setLoading(prev => ({ ...prev, vehicleResults: true }));
    setError(prev => ({ ...prev, vehicleResults: null }));
    try {
      console.log('Fetching vehicle results...');
      const response = await fetch('http://localhost:8080/rally/results2016/vehicle', {
        method: 'GET',
        headers: getAuthHeaders()
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Vehicle results fetch failed:', response.status, errorData);
        throw new Error(`Failed to fetch vehicle results data: ${response.status} - ${JSON.stringify(errorData)}`);
      }
      
      const data = await response.json();
      console.log('Vehicle results data received:', data?.length, 'records');
      setVehicleResults(data);
      applyFilters(data, 'vehicleResults');
    } catch (err) {
      console.error('Error fetching vehicle results:', err);
      setError(prev => ({ ...prev, vehicleResults: err.message }));
    } finally {
      setLoading(prev => ({ ...prev, vehicleResults: false }));
    }
  };

  // Log state changes
  React.useEffect(() => {
    console.log('DataContext state updated:', {
      standingsLength: standings?.length,
      raceResultsLength: raceResults?.length,
      vehicleResultsLength: vehicleResults?.length,
      filters: state.filters,
      filteredDataLength: state.filteredData?.length
    });
  }, [standings, raceResults, vehicleResults, state.filters, state.filteredData]);

  const value = {
    standings,
    raceResults,
    vehicleResults,
    loading,
    error,
    filters: state.filters,
    filteredData: state.filteredData,
    fetchStandings,
    fetchRaceResults,
    fetchVehicleResults,
    setFilter,
    clearFilters,
    applyFilters
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
