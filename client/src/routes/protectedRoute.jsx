import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../middleware/authContext';

const ProtectedRoute = () => {
  const { user } = useAuth();

  return user ? (
    <Route />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
