import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface AuthWrapperProps {
  children: React.ReactNode;
}

export const RequireAuth: React.FC<AuthWrapperProps> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (user === null) return <Navigate to="/login" state={{ from: location }} replace />;

  return <>{children}</>;
};

export const RequireAdmin: React.FC<AuthWrapperProps> = ({ children }) => {
  const { user } = useAuth();

  if (user === null) return <Navigate to="/login" replace />;
  if (user.role !== 'admin') return <Navigate to="/" replace />;

  return <>{children}</>;
};