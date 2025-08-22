import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  // If no token, redirect to home/login page
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // If user role is not authorized for this route, redirect to home/login page
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, render the protected component
  return children;
};

export default ProtectedRoute;
