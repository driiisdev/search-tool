import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../middleware/authContext';

const ProtectedRoute = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  const verifyToken = async () => {
    try {
      // Fetch user data (token assumed to be in Authorization header)
      const response = await axios.get('http://localhost:8000/api/v1/protected');

      console.log(response);
      if (response.status === 200) {
        setUser(response.data.user); // Update user state
      } else {
        console.error('Invalid authentication');
        setUser(null); // Set user to null on invalid response
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      setUser(null); // Set user to null on error
    } finally {
      setIsLoading(false); // Set loading to false after fetching or error
    }
  };

  useEffect(() => {
    verifyToken(); // Call verifyToken on component mount
  }, []);

  useEffect(() => {
    // Re-render when user state changes (after update)
    console.log(`user updated: ${user}`);
  }, [user]);

  // Conditionally render based on loading state or user
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

// import { useEffect, useState } from 'react';
// import { Routes, Route, Navigate, useSearchParams } from 'react-router-dom';
// import axios from 'axios';
// import { useAuth } from '../middleware/authContext';
// import Cookies from 'js-cookie';

// const ProtectedRoute = () => {
//   const { user, setUser } = useAuth();
//   const [searchParams] = useSearchParams();
//   const [isLoading, setIsLoading] = useState(true); // Track loading state

//   const verifyToken = async () => {
//     let token;
//     try {

//       // Get token from URL parameters
//       token = searchParams.get('token');
//       console.log(`token from param: ${token}`);

//       if (!token) {
//         console.error('No token found');
//         return false;
//       }

//       // Fetch user data with the token
//       const response = await axios.get('http://localhost:8000/api/v1/protected', {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log(response);
//       if (response.status === 200) {
//         setUser(response.data.user); // Update user state
//       } else {
//         console.error('Invalid token');
//         Cookies.remove('jwtToken');
//         setUser(null); // Set user to null on invalid token
//       }
//     } catch (error) {
//       console.error('Error verifying token:', error);
//       setUser(null); // Set user to null on error
//     } finally {
//       setIsLoading(false); // Set loading to false after fetching or error
//     }
//   };

//   useEffect(() => {
//     verifyToken(); // Call verifyToken on component mount
//   }, []);

//   useEffect(() => {
//     // Re-render when user state changes (after update)
//     console.log(`user updated: ${user}`);
//   }, [user]);

//   // Conditionally render based on loading state or user
//   return isLoading ? (
//     <div>Loading...</div>
//   ) : user ? (
//     <Routes>
//       <Route /> {/* Your child routes here */}
//     </Routes>
//   ) : (
//     <Navigate to="/login" replace />
//   );
// };

// export default ProtectedRoute;
