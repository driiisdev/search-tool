import { useAuth } from './authContext';

const isAuthenticated = () => {
  const { user } = useAuth();
  return !!user;
};

export default isAuthenticated;
