import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const ProtectedRoute = ({ children, requiredAuthority = "ADMIN" || "USER"}) => {
  const { user } = useUser();

  // if (!user.authenticated) {
  //   // Redirect to login if not authenticated
  //   return <Navigate to="/signin" replace />;
  // }

  if (user.authority !== requiredAuthority) {
    // Redirect to home if not authorized
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute; 