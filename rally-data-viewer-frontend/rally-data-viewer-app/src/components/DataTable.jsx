import React from 'react';
import '../css/DataTable.css';
import { formatColumnName } from '../utilities/NameModifier';

const DataTable = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  // Get column names from the first data object
  const columns = Object.keys(data[0]);

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  };

  // Format cell value based on column name
  const formatCellValue = (value, column) => {
    if (column.toLowerCase().includes('date')) {
      return formatDate(value);
    }
    return value;
  };

  return (
    <div className="data-table-container">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{formatColumnName(column)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={`${rowIndex}-${colIndex}`}>
                  {formatCellValue(row[column], column)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable; 