import React, { useState } from 'react';
import DataTable from './DataTable';
import { useScrollToComponent } from '../hooks/useScrollToComponent';

const Test = () => {
  const [testResult, setTestResult] = useState(null);
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
      case 'results':
        return 'rally/results';
      default:
        return option;
    }
  };

  const testApiCall = async (option) => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = getEndpoint(option);
      const response = await fetch(`http://localhost:8080/${endpoint}`);
      const data = await response.json();
      setTestResult(data);
    } catch (err) {
      setError('Failed to connect to the API');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setTestResult(null);
  };

  return (
    <div ref={componentRef} className="test-container">
      <div className="test-content">
        <h2>Rally Data Explorer</h2>
        <div className="test-section">
          <h3>Select Data Category</h3>
          <div className="test-options">
            <button 
              className={`test-option-button ${selectedOption === 'drivers' ? 'active' : ''}`}
              onClick={() => handleOptionSelect('drivers')}
            >
              Drivers
            </button>
            <button 
              className={`test-option-button ${selectedOption === 'events' ? 'active' : ''}`}
              onClick={() => handleOptionSelect('events')}
            >
              Events
            </button>
            <button 
              className={`test-option-button ${selectedOption === 'teams' ? 'active' : ''}`}
              onClick={() => handleOptionSelect('teams')}
            >
              Teams
            </button>
            <button 
              className={`test-option-button ${selectedOption === 'results' ? 'active' : ''}`}
              onClick={() => handleOptionSelect('results')}
            >
              Race Results
            </button>
          </div>

          {selectedOption && (
            <div className="test-action">
              <button 
                onClick={() => testApiCall(selectedOption)} 
                className="test-button"
                disabled={loading}
              >
                {loading ? 'Loading...' : `View ${selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)} Data`}
              </button>
            </div>
          )}
          
          {error && (
            <div className="test-error">
              {error}
            </div>
          )}
          
          {testResult && (
            <div className="test-result">
              <h4>Data Results:</h4>
              <DataTable data={testResult} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Test; 