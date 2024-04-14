import { useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../middleware/authContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  const verifyAuthentication = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/get-tokens', { withCredentials: true });
      if (response.status === 200) {
        sessionStorage.setItem('user', JSON.stringify(response.data.user));
        console.log(`successful`);
      }
    } catch (error) {
      console.error('Error verifying authentication:', error);
    }
  };

  useEffect(() => {
    verifyAuthentication();
  }, []);

  return user ? children : null;
};

export default ProtectedRoute;
