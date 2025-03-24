import React, { useLayoutEffect, useRef } from 'react';
import bgRallyCar from '../../assets/bg-rally-car-aykut-ercun.jpg';
import bgSmoke from '../../assets/background-smoke-cottonbro.jpg';
import SignUpButton from '../auth/SignUpButton';

const Banner = () => {
  const bannerRef = useRef(null);
  const imageRef = useRef(null);

  useLayoutEffect(() => {
    if (bannerRef.current) {
      bannerRef.current.style.backgroundImage = `url(${bgSmoke})`;
    }
    if (imageRef.current) {
      imageRef.current.src = bgRallyCar;
    }
  }, []); // Empty dependency array means this runs once after initial render

  return (
    <div className="banner">
      <div className="banner-content">
        <div className="banner-text">
          <h1 className="banner-title">Rally Data Viewer</h1>
          <p className="banner-tagline">A site for rally motorsport enthusiasts</p>
      
      </div>
      </div>
      <div className="banner-content">
        <div className="banner-image">
          <img 
            ref={imageRef}
            alt="Rally car in action" 
            className="banner-car-image"
            loading="eager"
          />
         <div className="banner-signup-overlay">
          <SignUpButton />
         </div>
        </div>
      </div>
    </div>
  );
};

export default Banner; 