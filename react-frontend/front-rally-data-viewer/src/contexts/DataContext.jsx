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
    dispatch({ type: 'SET_FILTER', payload: { key, value } });
  };

  const clearFilters = () => {
    dispatch({ type: 'CLEAR_FILTERS' });
  };

  const applyFilters = (data, dataType) => {
    dispatch({ type: 'APPLY_FILTERS', payload: { data, dataType } });
  };

  const fetchStandings = async () => {
    setLoading(prev => ({ ...prev, standings: true }));
    setError(prev => ({ ...prev, standings: null }));
    try {
      const response = await fetch('http://localhost:8080/rally/standings2016');
      if (!response.ok) {
        throw new Error('Failed to fetch standings data');
      }
      const data = await response.json();
      setStandings(data);
      applyFilters(data, 'standings');
    } catch (err) {
      setError(prev => ({ ...prev, standings: err.message }));
    } finally {
      setLoading(prev => ({ ...prev, standings: false }));
    }
  };

  const fetchRaceResults = async () => {
    setLoading(prev => ({ ...prev, raceResults: true }));
    setError(prev => ({ ...prev, raceResults: null }));
    try {
      const response = await fetch('http://localhost:8080/rally/results2016');
      if (!response.ok) {
        throw new Error('Failed to fetch race results data');
      }
      const data = await response.json();
      setRaceResults(data);
      applyFilters(data, 'raceResults');
    } catch (err) {
      setError(prev => ({ ...prev, raceResults: err.message }));
    } finally {
      setLoading(prev => ({ ...prev, raceResults: false }));
    }
  };

  const fetchVehicleResults = async () => {
    setLoading(prev => ({ ...prev, vehicleResults: true }));
    setError(prev => ({ ...prev, vehicleResults: null }));
    try {
      const response = await fetch('http://localhost:8080/rally/results2016/vehicle');
      if (!response.ok) {
        throw new Error('Failed to fetch vehicle results data');
      }
      const data = await response.json();
      setVehicleResults(data);
      applyFilters(data, 'vehicleResults');
    } catch (err) {
      setError(prev => ({ ...prev, vehicleResults: err.message }));
    } finally {
      setLoading(prev => ({ ...prev, vehicleResults: false }));
    }
  };

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
