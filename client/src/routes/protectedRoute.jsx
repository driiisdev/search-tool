import { useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../middleware/authContext';

const ProtectedRoute = ({ children }) => {
  const { user, setUser } = useAuth();

  const verifyAuthentication = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/get-tokens', { withCredentials: true });
      if (response.status === 200) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Error verifying authentication:', error);
      setUser(null);
    }
  };

  useEffect(() => {
    verifyAuthentication();
  }, []);

  return user ? children : null;
};

export default ProtectedRoute;
