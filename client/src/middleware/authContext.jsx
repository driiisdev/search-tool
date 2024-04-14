import { useState, useEffect, createContext, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const retrieveUserFromSessionStorage = () => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(storedUser);
      console.log(user);
    }
  };

  useEffect(() => {
    retrieveUserFromSessionStorage();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
