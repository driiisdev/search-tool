import { Route, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../middleware/authContext';
import { useEffect } from 'react';

const ProtectedRoute = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // Access query parameters

  const token = searchParams.get('token'); // Extract token from URL

  // Check for token in URL or local storage (if login happened before)
  const storedToken = localStorage.getItem('jwtToken') || token;

  // Verify token with backend if available
  const verifyToken = async () => {
    if (storedToken) {
      try {
        const response = await axios.get('/api/v1/protected', {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        if (response.status === 200) {
          setUser({ token: storedToken }); // Set user context with token
          localStorage.setItem('jwtToken', storedToken); // Store in local storage
          return true; // Token is valid
        } else {
          console.error('Invalid token');
          localStorage.removeItem('jwtToken'); // Remove invalid token
        }
      } catch (error) {
        console.error('Error verifying token:', error);
      }
    }
    return false; // Token not found or invalid
  };

  useEffect(() => {
    const isAuthenticated = async () => {
      const tokenValid = await verifyToken();
      if (!tokenValid) {
        navigate('/login'); // Redirect to login if not authenticated
      }
    };
    isAuthenticated();
  }, [navigate]); // Run on component mount and navigation changes

  return user ? (
    <Route />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
