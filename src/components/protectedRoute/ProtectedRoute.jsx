import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../auth/Auth';

export function ProtectedRoute({ children }) {
  const authenticated = isAuthenticated();

  console.log(children);
  
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
