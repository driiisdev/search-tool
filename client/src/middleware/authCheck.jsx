import { Navigate } from 'react-router-dom';
import { useAuth } from './authContext';

const AuthCheck = ({children}) => {
    const { user } = useAuth();
    const isAuthenticated = user !== undefined && !!user;

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default AuthCheck;
