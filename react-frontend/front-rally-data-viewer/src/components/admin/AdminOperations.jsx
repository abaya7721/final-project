import React from 'react';

const BASE_URL = 'http://localhost:8080/rally';

export const AdminOperations = {
  // POST operations
  addData: async (dataType, data) => {
    try {
      const response = await fetch(`${BASE_URL}/${dataType.toLowerCase()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to add ${dataType}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error adding ${dataType}:`, error);
      throw error;
    }
  },

  // PUT operations
  updateData: async (dataType, id, data) => {
    try {
      const response = await fetch(`${BASE_URL}/${dataType.toLowerCase()}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to update ${dataType}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error updating ${dataType}:`, error);
      throw error;
    }
  },

  // DELETE operations
  deleteData: async (dataType, id) => {
    try {
      const response = await fetch(`${BASE_URL}/${dataType.toLowerCase()}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete ${dataType}: ${response.statusText}`);
      }

      return true;
    } catch (error) {
      console.error(`Error deleting ${dataType}:`, error);
      throw error;
    }
  },

  // GET operations for fetching data
  getData: async (dataType, id = null) => {
    try {
      const url = id 
        ? `${BASE_URL}/${dataType.toLowerCase()}/${id}`
        : `${BASE_URL}/${dataType.toLowerCase()}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch ${dataType}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${dataType}:`, error);
      throw error;
    }
  },

  // Helper function to validate data based on type
  validateData: (dataType, data) => {
    const requiredFields = {
      driver: ['name', 'nationality', 'teamId'],
      event: ['name', 'date', 'location'],
      vehicle: ['make', 'model', 'year'],
      team: ['name', 'vehicleId']
    };

    const fields = requiredFields[dataType.toLowerCase()];
    if (!fields) {
      throw new Error(`Invalid data type: ${dataType}`);
    }

    const missingFields = fields.filter(field => !data[field]);
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    return true;
  }
}; 