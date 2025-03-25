import React, { useState } from 'react';
import { useAuth } from '../../contexts/UserAuthContext';
import { AdminOperations } from './AdminOperations';
import '../../css/AdminDataManager.css';

const AdminDataManager = () => {
  const { user } = useAuth();
  const [selectedDataType, setSelectedDataType] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const dataTypes = ['Driver', 'Event', 'Vehicle', 'Team'];
  const actions = ['Add', 'Update', 'Delete'];

  const getFieldsForType = (dataType) => {
    switch (dataType) {
      case 'Driver':
        return {
          name: { type: 'text', label: 'Name' },
          nationality: { type: 'text', label: 'Nationality' },
          teamId: { type: 'number', label: 'Team ID' }
        };
      case 'Event':
        return {
          name: { type: 'text', label: 'Name' },
          date: { type: 'date', label: 'Date' },
          location: { type: 'number', label: 'Region ID' }
        };
      case 'Vehicle':
        return {
          make: { type: 'text', label: 'Make' },
          model: { type: 'text', label: 'Model' },
          year: { type: 'number', label: 'Year (YYYY)' }
        };
      case 'Team':
        return {
          name: { type: 'text', label: 'Name' },
          vehicleId: { type: 'number', label: 'Vehicle ID' }
        };
      default:
        return {};
    }
  };

  const handleDataTypeSelect = (dataType) => {
    setSelectedDataType(dataType);
    setSelectedAction(null);
    setFormData({});
    setError(null);
    setSuccess(null);
  };

  const handleActionSelect = (action) => {
    setSelectedAction(action);
    setFormData({});
    setError(null);
    setSuccess(null);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      let result;
      
      // Only validate all required fields for ADD operation
      if (selectedAction === 'Add') {
        AdminOperations.validateData(selectedDataType, formData);
      } else if (selectedAction === 'Update') {
        if (!formData.id) {
          throw new Error('ID is required for update operation');
        }
        // For update, only validate fields that were filled in
        const filledData = Object.fromEntries(
          Object.entries(formData).filter(([_, value]) => value !== '')
        );
        if (Object.keys(filledData).length <= 1) { // If only ID is present
          throw new Error('At least one field must be updated');
        }
      }

      // Transform data for team operations
      let dataToSend = { ...formData };
      if (selectedDataType === 'Team') {
        if (formData.name) {
          dataToSend.teamName = formData.name;
          delete dataToSend.name;
        }
      }

      switch (selectedAction) {
        case 'Add':
          result = await AdminOperations.addData(selectedDataType, dataToSend);
          setSuccess(`Successfully added new ${selectedDataType.toLowerCase()}`);
          break;
        case 'Update':
          result = await AdminOperations.updateData(selectedDataType, formData.id, dataToSend);
          setSuccess(`Successfully updated ${selectedDataType.toLowerCase()}`);
          break;
        case 'Delete':
          await AdminOperations.deleteData(selectedDataType, formData.id);
          setSuccess(`Successfully deleted ${selectedDataType.toLowerCase()}`);
          break;
        default:
          throw new Error('Invalid action');
      }

      setFormData({}); // Reset form after successful operation
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => {
    if (selectedAction === 'Delete') {
      return (
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label htmlFor="id">ID:</label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Processing...' : `Delete ${selectedDataType}`}
          </button>
        </form>
      );
    }

    const fields = getFieldsForType(selectedDataType);

    return (
      <form onSubmit={handleSubmit} className="admin-form">
        {selectedAction === 'Update' && (
          <div className="form-group">
            <label htmlFor="id">ID:</label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id || ''}
              onChange={handleInputChange}
              required
            />
          </div>
        )}
        {Object.entries(fields).map(([fieldName, fieldConfig]) => (
          <div key={fieldName} className="form-group">
            <label htmlFor={fieldName}>{fieldConfig.label}:</label>
            <input
              type={fieldConfig.type}
              id={fieldName}
              name={fieldName}
              value={formData[fieldName] || ''}
              onChange={handleInputChange}
              required={selectedAction === 'Add'}
              className={selectedAction === 'Add' ? 'required-field' : ''}
            />
          </div>
        ))}
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Processing...' : `${selectedAction} ${selectedDataType}`}
        </button>
      </form>
    );
  };

  return (
    <div className="admin-data-manager">
      <div className="admin-mode-banner">
        <h1>Admin Mode</h1>
        <p>Data Management Console</p>
      </div>

      <div className="data-manager-content">
        <div className="data-type-section">
          <h2>Select Data Type</h2>
          <div className="data-type-buttons">
            {dataTypes.map(dataType => (
              <button
                key={dataType}
                className={`data-type-button ${selectedDataType === dataType ? 'active' : ''}`}
                onClick={() => handleDataTypeSelect(dataType)}
              >
                {dataType}
              </button>
            ))}
          </div>
        </div>

        {selectedDataType && (
          <div className="action-section">
            <h2>Select Action</h2>
            <div className="action-buttons">
              {actions.map(action => (
                <button
                  key={action}
                  className={`action-button ${selectedAction === action ? 'active' : ''}`}
                  onClick={() => handleActionSelect(action)}
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedAction && (
          <div className="form-section">
            <h2>{`${selectedAction} ${selectedDataType}`}</h2>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            {renderForm()}
          </div>
        )}

        <div className="admin-navigation">
          <a href="/admin/data-viewer" className="nav-link">Data Viewer</a>
          <a href="/admin" className="nav-link">Home</a>
        </div>
      </div>
    </div>
  );
};

export default AdminDataManager; 