import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/UserAuthContext';

const ProtectedRoute = ({ children, requiredRole = "ROLE_USER" }) => {
  const { user, isAuthenticated } = useAuth();

  // Check if user is authenticated
  if (!isAuthenticated()) {
    console.log('User not authenticated, redirecting to login');
    return <Navigate to="/signin" replace />;
  }

  // Strict role checking - exact match required
  if (!user || user.role !== requiredRole) {
    console.log('User lacks required role:', requiredRole, 'Current role:', user?.role);
    // Redirect admin to admin dashboard, users to user dashboard
    if (user.role === "ROLE_ADMIN") {
      return <Navigate to="/admin" replace />;
    } else if (user.role === "ROLE_USER") {
      return <Navigate to="/user" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute; 