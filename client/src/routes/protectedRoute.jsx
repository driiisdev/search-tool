import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../middleware/authContext';

const ProtectedRoute = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const verifyAuthentication = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/protected');

      if (response.status === 200) {
        setUser(response.data.user);
      } else {
        console.error('Unauthorized access');
        setUser(null);
        navigate('/login', { replace: true });
      }
    } catch (error) {
      console.error('Error verifying authentication:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Retrieve custom token from storage (replace with your storage mechanism)
    // !!! no token was stored in the localstorage so i dont understand this here
    const authToken = localStorage.getItem('customAuthToken');

    // Set custom header in Axios defaults if token exists
    if (authToken) {
      axios.defaults.headers.common['X-Auth-Token'] = authToken;
    }

    verifyAuthentication();
  }, []);

  useEffect(() => {
    console.log(`user updated: ${user}`);
  }, [user]);

  return isLoading ? (
    <div>Loading...</div>
  ) : user ? (
    <Routes>
      <Route /> {/* Your child routes here */}
    </Routes>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
