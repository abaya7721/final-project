import React from 'react';
import Banner from '../common/Banner';
import SignUpButton from '../auth/SignUpButton';
import { useScrollToComponent } from '../../hooks/useScrollToComponent';

const HomePage = () => {
  const componentRef = useScrollToComponent();

  return (
    <div ref={componentRef} className="home-page">
      <Banner />
    </div>
  );
};

export default HomePage; 