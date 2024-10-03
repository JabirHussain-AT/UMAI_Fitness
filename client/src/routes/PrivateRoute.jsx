// components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // Optionally add a loading state

  return true ? children : <Navigate to="/signup" />;
};

export default PrivateRoute;
