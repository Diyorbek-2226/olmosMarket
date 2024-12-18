import { Navigate } from 'react-router-dom';
import { isAuthenticated, hasRole } from '../auth/Auth';

export function ProtectedRoute({ children, requiredRole }) {
  const authenticated = isAuthenticated();
  
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

