import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../middleware/authContext';

const ProtectedRoute = ({ children }) => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const verifyAuthentication = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/get-tokens', { withCredentials: true });
      if (response.status === 200) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Error verifying authentication:', error);
      setUser(null);
      navigate('/login', { replace: true });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    verifyAuthentication();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
