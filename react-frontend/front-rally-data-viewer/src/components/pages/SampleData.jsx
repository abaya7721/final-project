import React, { useState } from 'react';
import '../../css/SampleData.css';
import { useNavigate } from 'react-router-dom';

const SampleData = () => {
  const [zoomedImage, setZoomedImage] = useState(null);
  const navigate = useNavigate();

  const handleImageClick = (imageSrc) => {
    setZoomedImage(imageSrc);
  };

  const handleCloseZoom = () => {
    setZoomedImage(null);
  };

  return (
    <div className="sample-data-container">
      <h2 className="sample-data-title">World Rally Championship Data</h2>
      <p className="sample-data-description">
        Below are examples of the data you can view as a registered user.
      </p>
      
      <div className="sample-content-wrapper">
        <div className="sample-data-content">
          <div className="sample-images-container">
            <div className="sample-image-card">
              <img 
                src="/standings.JPG" 
                alt="Sample Table 1" 
                className="sample-image"
                onClick={() => handleImageClick("/standings.JPG")}
              />
              <p className="sample-image-caption">
                Example of Yearly Standings - click to view
              </p>
            </div>

            <div className="sample-image-card">
              <img 
                src="/sample-table2.JPG" 
                alt="Sample Table 2" 
                className="sample-image"
                onClick={() => handleImageClick("/sample-table2.JPG")}
              />
              <p className="sample-image-caption">
                Example of Filtered Race Results with Events- click to view
              </p>
            </div>
          </div>
        </div>

        <div className="sample-data-info">
          <h3>Features Available:</h3>
          <ul>
            <li>Filter data by multiple criteria</li>
            <li>View detailed race information</li>
            <li>Access historical data</li>
          </ul>
          <button 
            className="signup-button-sample"
            onClick={() => navigate('/signup')}
          >
            Sign Up Now
          </button>
        </div>
      </div>

      {zoomedImage && (
        <div className="zoom-overlay" onClick={handleCloseZoom}>
          <img 
            src={zoomedImage} 
            alt="Zoomed view" 
            className="zoomed-image"
          />
          <button className="close-zoom" onClick={handleCloseZoom}>×</button>
        </div>
      )}
    </div>
  );
};

export default SampleData; 