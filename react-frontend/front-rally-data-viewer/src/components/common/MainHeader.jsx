import React from 'react';
import Navigation from './Navigation';
import logo from '../../assets/rally-data-logo.PNG';
const MainHeader = () => {
  return (
    <header className="header">
      <Navigation />
        {/* <img src={logo} alt="logo" /> */}
    </header>
  );
};

export default MainHeader;
