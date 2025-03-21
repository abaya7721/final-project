import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToComponent = () => {
  const componentRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (componentRef.current) {
      componentRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [location.pathname]);

  return componentRef;
}; 